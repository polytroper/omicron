// State

let width
let height

const stateData = {
  currentLevelTag: null,
  levels: _.zipObject(
    _.map(LEVELS, v => v.tag),
    _.map(LEVELS, v => {return {}})
  ),
}
let levelState
let levelData

_.each(LEVELS, v => {
  // Connect each level data object to its level state object
  v.state = stateData.levels[v.tag]
})
console.log(stateData)

let showingLevel = false

// Automatically unlock all levels if url includes #all
const showAll = _.includes(location.href, '#all')

// DOM

const body = d3.select('body')
const svg = body.select('svg')

const frameHolder = body.append('div')
    .attr('class', 'frameHolder')

const overlay = body.append('div')
    .attr('class', 'overlay')
    
const curtain = body.append('div')
    .attr('class', 'curtain')
    .attr('hide', false)

const defs = svg.select('defs')

defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 5)
    .attr('refY', 0)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
  .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('class', 'arrowHead');

function resize() {
  width = window.innerWidth
  height = window.innerHeight

  svg.attr('width', width)
  svg.attr('height', height)

  frame.attr('width', width)
  frame.attr('height', height)
}

addEventListener('resize', resize)

let frame
let frameWindow

// Hack to work around the fact that onload only fires the first time an iframe's src is set
function insertFreshFrame() {
  if (frame)
    frame.remove()

  frame = frameHolder.append('iframe')
      .attr('class', 'frame')
      .attr('width', width)
      .attr('height', height)
      .attr('hide', true)
  frameWindow = frame.node().contentWindow
}
insertFreshFrame()

resize()

const container = svg.append('g')

const zoom = d3.zoom()
    .scaleExtent([.5, 4])
    .on('zoom', function(event) {
      container.attr('transform', event.transform)
    })

svg.call(zoom)
zoom.translateBy(svg, width/2, height/2)

// Overlay

const bottomBar = overlay.append('div')
    .attr('class', 'bar floating bottom')
    .attr('id', 'bottom-bar')

const mapButton = bottomBar.append('div')
    .attr('class', 'button')
    .attr('id', 'map-button')
    .attr('hide', true)
  .on('click', onClickMapButton)

mapButton.append('div')
    .attr('class', 'string')
    .text('🗺️')

const victoryBar = overlay.append('div')
    .attr('class', 'bar floating top')
    .attr('id', 'victory-bar')

const victoryButton = victoryBar.append('div')
    .attr('class', 'button')
    .attr('id', 'victory-button')
    .attr('hide', true)
  .on('click', onClickVictoryButton)

victoryButton.append('div')
    .attr('class', 'string')
    .text('NEXT')

const bottomBarBumper = bottomBar.append('div')

// Node Graph

const edges = container.append('g')
    .attr('class', 'edges')

const nodes = container.append('g')
    .attr('class', 'nodes')

let edgeData = []

_.each(LEVELS, level => {
  level.edges = _.map(level.ancestors, ancestor => {
    const dx = (level.x-ancestor.x)
    const dy = (level.y-ancestor.y)
    const m = Math.sqrt(dx*dx + dy*dy)

    const nx = dx/m
    const ny = dy/m

    return {
      level,
      ancestor,

      tag: level.tag+'+'+ancestor.tag,

      endX: dx-nx*(level.size/2+6),
      endY: dy-ny*(level.size/2+6),

      get 0() {return ancestor},
      get 1() {return level},

      get available() {return level.available},
      get visible() {return level.visible},
      get faded() {return !ancestor.state.complete},
    }
  })

  edgeData = [
    ...edgeData,
    ...level.edges,
  ]
})

function refreshGraph() {
  _.each(LEVELS, level => {
    level.available = _.every(level.ancestors, v => v.state.complete) || showAll
    level.visible = _.some(level.ancestors, v => v.available) || level.available
    level.faded = level.visible && !level.available
  })

  const visibleNodes = _.filter(LEVELS, v => v.visible)
  const visibleEdges = _.filter(edgeData, v => v.visible)

  nodes.selectAll('g').data(visibleNodes, d => d.tag).join(
    function(enter) {
      const g = enter.append('g')
          .attr('class', 'node')
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          .style('opacity', 0)
      
      g.transition().duration(1000)
          .style('opacity', 1)

      g.append('circle')
          .attr('r', d => d.size/2)

      g.append('text')
          .text(d => d.name || d.tag)
          .attr('transform', `translate(0, ${30})`)
          .style('opacity', d => d.available ? 1 : 0)

      g.on('click', (event, d) => {
        if (d.available) {
          if (d.link || d.data)
            transitionLevel(d)
          else
            autocompleteLevel(d)
        }
      })

      return g
    },
    function(update) {
      const g = update

      g.select('text')
        .transition().duration(2000)
          .style('opacity', d => d.available ? 1 : 0)

      return g
    },
    function(exit) {
      return exit
    }
  )
      .classed('faded', d => d.faded)
      .classed('complete', d => d.state.complete)

  edges.selectAll('g').data(visibleEdges, d => d.tag).join(
    function(enter) {
      const g = enter.append('g')
          .attr('class', 'edge')
          .attr('transform', d => `translate(${d[0].x}, ${d[0].y})`)
          .style('opacity', 0)
      
      g.transition().duration(2000)
          .style('opacity', d => d.visible ? 1 : 0)
      
      g.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', d => d.endX)
          .attr('y2', d => d.endY)
          .attr('marker-end', 'url(#arrow)')
          .attr('stroke-dasharray', d => d.faded ? '4 4' : '4 0')
      
      return g
    },
    function(update) {
      const g = update

      g.transition().duration(1000)
          .style('opacity', d => d.visible ? 1 : 0)

      g.select('line')
        .transition().duration(1000)
          .attr('stroke-dasharray', d => d.faded ? '4 4' : '4 0')
      
      return g
    },
    function(exit) {

    }
  )
}

refreshGraph()

// Transitions

function showFrame() {
  showingLevel = true
  console.log('Showing frame')
  frame.attr('hide', false)
  mapButton.attr('hide', false)
}

function hideFrame() {
  showingLevel = false
  console.log('Hiding frame')
  frame.attr('hide', true)
}

async function showCurtain() {
  console.log('Showing curtain')

  curtain.attr('hide', false)
  await new Promise((resolve, reject) => {
    curtain
        .style('opacity', 0)
        .style('pointer-events', 'all')
      .transition()
        .duration(500)
        .style('opacity', 1)
        .on('end', resolve)
  })
}

async function hideCurtain() {
  console.log('Hiding curtain')

  await new Promise((resolve, reject) => {
    curtain
        .style('pointer-events', 'none')
      .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', resolve)
  })
  curtain.attr('hide', true)
}

async function showVictoryButton() {
  console.log('Showing Victory Button')

  victoryButton.attr('hide', false)
  await new Promise((resolve, reject) => {
    victoryButton
        .style('pointer-events', 'all')
      .transition()
        .duration(500)
        .style('opacity', 1)
        .on('end', resolve)
  })
}

async function hideVictoryButton() {
  console.log('Hiding Victory Button')

  await new Promise((resolve, reject) => {
    victoryButton
        .style('pointer-events', 'none')
      .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', resolve)
  })
  victoryButton.attr('hide', true)
}

async function curtainTransition(cb) {
  await showCurtain()
  cb()
  await hideCurtain()
}

async function autocompleteLevel(level) {
  await showCurtain()
  level.state.complete = true
  await hideCurtain()
  refreshGraph()
}

async function loadLevel(level) {
  levelData = level
  if (!_.has(stateData.levels, level.tag))
    stateData.levels[level.tag] = {}
  levelState = stateData.levels[level.tag]
  
  insertFreshFrame()

  await new Promise((resolve, reject) => {
    frame.attr('src', level.link || 'https://vectorfeels.polytrope.repl.co/#')
    frame.node().onload = resolve
    console.log('Loading level…')
  })

  console.log('Level loaded. Posting level data')
  frameWindow.postMessage({
    puzzleData: level.data || null
  }, '*')
}

async function showMap() {
  hideVictoryButton()
  await showCurtain()
  hideFrame()
  await hideCurtain()
  refreshGraph()
}

async function transitionLevel(level) {
  if (level == levelData) {
    await showCurtain()
  }
  else {
    await Promise.all([showCurtain(), loadLevel(level)])
  }
  showFrame()
  await hideCurtain()
}

async function start() {
  await hideCurtain()
}

start()

// Events

function onClickMapButton() {
  if (showingLevel)
    showMap()
  else if (levelData)
    transitionLevel(levelData)
}

function onClickVictoryButton() {
  showMap()
}

addEventListener('keydown', function(event) {
  console.log('Key down:', event)
  if (event.keyCode == 27) {
    if (levelData)
      exitLevel()
  }
})

addEventListener('message', function(event) {
  console.log('Message:', event.data)
  const channel = event.data.channel
  
  switch(channel) {
    case 'victory':
      levelState.complete = true
      showVictoryButton()
      break;
    case 'stopRunning':
      hideVictoryButton()
      break;
  }
})