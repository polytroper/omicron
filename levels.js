var LEVELS = [{
  name: 'Welcome',
  tag: 'intro',
  x: 0,
  y: 0,
  ancestors: [],
}, {
  name: 'Get Real',
  tag: 'real_0',
  x: 0,
  y: 100,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yA5AIzlYA2IotAKngC7IA+WSSehxpREio0eAYRi16AY1YwwCbkgC0SXMmw8AYlFwgAJgHEYAQ1qKeq9SoBMdBiHNK+RErCEilEqSFnyLPCpqGko6ekamToFB1sp2QA'
}, {
  name: 'Developing Expertise',
  tag: 'real_1',
  x: -100,
  y: 100,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yuWANiKJQCp4AuyAPlkknocaYkgOS5+7JAGEYlagGNGMMAhEBaJLmQBGJSuQBmEQDEouEABMA4jACGlBR2WrUm+wBYqNENZFciJWHwodxSRAZORsOJDt1EVstJF0OAyMzSw9wiNjsNMikFyA'
}, {
  name: 'Get Imaginative',
  tag: 'imaginary_0',
  x: 100,
  y: 100,
  ancestors: 'real_0',
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yA5ALQBMU5WANiKAwCp4AuyAPlkknkLFSiJFVr1+AYRgMmAYw4wwCPkkpJcybPwBiUXCAAmAcRgBDBqv4aAnsmqNmIK2sFESsUeLpqZckEVla351TW01fUNTC1dQsPJbcgcsIA'
}, {
  name: 'Understanding Why',
  tag: 'imaginary_1',
  x: 100,
  y: 0,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yAngFRRYA2IotAKngC7IA+WSSehxpREgDkVKMO5IAwjFr0AxqxhgEkgLRJcybDx7lkagCzqk+pACZJAMSi4QAEwDiMAIa1VPDWbUBmST2V7cGQAQRMzAEZ-JEDgpDDPU21o2JUkACFwg0tdGLAgtMzE7yjc1OQpOgYQd0k+IhJYITFJGTkQRWUPXQ0tVGieUWEDY1yNIeQcpBs7J1dasZFyYaRfAbyC0Ojx5eRS3I24hJ6llZ0D8ozt0+z1y6KTidX9svy4yqA'
}, {
  name: 'Simply Complex',
  tag: 'complex_0',
  ancestors: ['real_0', 'imaginary_0'],
  x: 0,
  y: 200,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yAjANRRYA2IotAKngC7IA+AtFkknoWKlESAORUoo3kgDCMWvQDGrGGATSuSXMmx8AYlFwgAJgHEYAQ1rq+m7UgBM0vgE9kXACx0GIa9IFEJLAiEtJyCiDKqjZ8SHY60gZGZpZ+sXFayE7pfKIuou5eQA',
}, {
  name: 'It\'s a Sine',
  tag: 'complex_sin_0',
  x: -100,
  y: 100,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yA5ALTRwAUAngFT5QCU5WANiKJwCp4ALsgA+lLEiR5CxUoiRUaDZmw6SAwjE7cAxoJhgEEpJSS5k2SZPrJKAJjQBWYwDEouEABMA4jACGnEaSpuZIAIzG1sgAzJFIBp7gyC7GIbYRVkg2SHZxCUlIAKKpZsgZVtnlkvmGSAAiJaGUVVkWeWCJteqNZXHZze2dyABCPSYt-bmZNcgAglw8IIHG0kQksPKKUHRMLOzGmtogegZBVmmocZLk9OS2Ds6Sbh4+-suZFy3XtzFX8R0FFIfUrjP43O45P4zIpxT5gn7hKEA2oNYFNL4KBGWTL-IZIbpo3o4zEQgbE6GjQmg4ng+5IvHzIA'
}, {
  ancestors: 'complex_0',
  name: 'Cross',
  tag: 'complex_cross',
  x: 100,
  y: 100,
  data: {
    version: '0.0.0',
    level: {
      expression: '\\left[x,\\ 0\\right]',
      Collector: [{
        x: -2,
        y: 2
      }, {
        x: 2,
        y: -2
      }],
      FixedGoal: [{
        x: 2,
        y: 2,
        order: 'B'
      }, {
        x: 0,
        y: 2,
        order: 'A'
      }, {
        x: -2,
        y: -2,
        order: 'B'
      }, {
        x: 0,
        y: -2,
        order: 'A'
      }]
    }
  }
}, {
  ancestors: 'complex_0',
  name: 'What Goes Up',
  tag: 'complex_parabola_0',
  x: 0,
  y: 100,
  link: 'https://polytrope.com/vectorfeels/?G4UwTgzglg9gdgLgAQAYB06UCgQA8AOYIE08yAjANS4BUUWANiKAwCp4AuyAPgLRZIkeQsVKIkAciq0oEgUgDCMBkwDGHGGATzeSXMl4BmeYICeybIIBiUXCAAmAcRgBDBtsG79SXgCYTSOZI5Gi+AKw6egbkAUH+nlGosci+oREJ3jGCZimR3vHZQSHhecjG2YEWjMwg7vLCRCSw4tJ08koqIOqaHtleBuUVkqYSVda2Ds5uvRkGBRUSIxRpAf0+WUOLo0jzPomWm0s7KxVrGwtHu2u7glvLJaeJgxfb2EA'
}, {
  name: 'Must Come Down',
  tag: 'complex_parabola_1',
  x: 0,
  y: 100,
  data: {
    version: '0.0.0',
    level: {
      expression: '\\left[1,\\ x\\right]',
      Collector: [{
        x: 0,
        y: 3
      }],
      FixedGoal: [{
        x: 0.625,
        y: 2
      }, {
        x: 1,
        y: -1
      }, {
        x: 1.125,
        y: 0
      }, {
        x: 1,
        y: 1
      }, {
        x: 0.625,
        y: -2
      }, {
        x: 0,
        y: -3
      }]
    }
  }
}, {
  name: 'Spinning Wheel',
  tag: 'complex_rotate_0',
  x: 0,
  y: 100,
  data: {
    version: '0.0.0',
    level: {
      expression: '\\left[-y,\\ x\\right]',
      Collector: [{
        x: 0,
        y: 2
      }],
      FixedGoal: [{
        x: 2,
        y: 0,
        order: 'A'
      }, {
        x: 0,
        y: -2,
        order: 'B'
      }, {
        x: -2,
        y: 0,
        order: 'C'
      }]
    }
  }
}, {
  name: 'Spinning Round',
  tag: 'complex_rotate_1',
  x: 0,
  y: 100,
  data: {
    version: '0.0.0',
    level: {
      expression: '\\left[y,\\ -x\\right]',
      Collector: [{
        x: 3,
        y: 3
      }],
      FixedGoal: [{
        x: 5,
        y: 1,
        order: 'C'
      }, {
        x: 3,
        y: -1,
        order: 'B'
      }, {
        x: 1,
        y: 1,
        order: 'A'
      }]
    }
  }
}, {
  name: 'Squared',
  tag: 'complex_rotate_square',
  x: 0,
  y: 100,
  data: {
    version: '0.0.0',
    expression: '[y, -x]',
    level: {
      expression: '\\left[y,\\ -x\\right]',
      Collector: [{
        x: -4,
        y: 0
      }],
      FixedGoal: [{
        x: 2,
        y: -2,
        order: 'E'
      }, {
        x: 4,
        y: 0,
        order: 'D'
      }, {
        x: 2,
        y: 2,
        order: 'C'
      }, {
        x: 0,
        y: 4,
        order: 'B'
      }, {
        x: -2,
        y: 2,
        order: 'A'
      }, {
        x: -2,
        y: -2,
        order: 'G'
      }, {
        x: 0,
        y: -4,
        order: 'F'
      }]
    }
  }
}, {
  name: 'The Flippening',
  tag: 'time_sine_flip',
  x: 0,
  y: 100,
  data: {
    version: '0.0.0',
    expression: '[0, cos(x * (pi)/(2))]',
    level: {
      expression: '\\left[0,\\ \\cos \\left(x\\cdot \\frac{pi}{2}\\right)\\right]',
      Collector: [{
        x: -2,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: 2,
        y: 0
      }],
      FixedGoal: [{
        x: 2,
        y: 1,
        order: 'A'
      }, {
        x: 0,
        y: 1,
        order: 'B'
      }, {
        x: -2,
        y: 1,
        order: 'A'
      }, {
        x: -2,
        y: -1,
        order: 'B'
      }, {
        x: 0,
        y: -1,
        order: 'A'
      }, {
        x: 2,
        y: -1,
        order: 'B'
      }]
    }
  }
}]

function preprocessLevels(levels) {
  // Compute list of ancestors
  let lastLevel = levels[0]
  _.each(_.tail(levels), level => {

    const findLevel = tag => {
      if (!tag)
        return lastLevel
      return _.find(levels, lvl => lvl.tag == tag)
    }

    if (_.isArray(level.ancestors))
      level.ancestors = _.map(level.ancestors, findLevel)
    else if (_.isString(level.ancestors))
      level.ancestors = [findLevel(level.ancestors)]
    else
      level.ancestors = [lastLevel]

    lastLevel = level
  })

  // Compute absolute positions (given relative to first ancestor)
  _.each(_.tail(levels), level => {
    if (!level.x)
      level.x = 0
    if (!level.y)
      level.y = 0

    const ancestor = level.ancestors[0]

    level.x += ancestor.x
    level.y += ancestor.y
  })

  // Apply a default size
  _.each(levels, level => {
    if (!level.size)
      level.size = 50
  })

  // Make sure link is marked with a # so the iframed app will wait for a message
  _.each(levels, level => {
    if (level.link)
      level.link = level.link.replace('?', '#?')
  })
}

preprocessLevels(LEVELS)