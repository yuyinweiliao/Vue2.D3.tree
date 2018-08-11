import gremlins from 'gremlins.js/src/main'

function getGremlin (element, changeType, changeLayout, resetZoom) {
  const horde = gremlins.createHorde()
    .gremlin(gremlins.species.clicker()
    .canClick((element) => {
      switch (element.tagName) {
        case 'circle':
        case 'BUTTON':
        case 'text':
          return true

        case 'INPUT':
          return element.type === 'checkbox'
      }
      return false
    }).maxNbTries(15))
    .gremlin(function () {
      console.log('gremlin changeType')
      changeType()
    })
    .gremlin(function () {
      console.log('gremlin changeLayout')
      changeLayout()
    })
    .gremlin(function () {
      console.log('gremlin resetZoom')
      resetZoom()
    })
    .gremlin(function () {
      console.log('gremlin click circle')
      const circles = [...element.getElementsByTagName('circle')]
      if (circles.length === 0) {
        return
      }
      const idx = Math.round(Math.random() * (circles.length - 1))
      const circle = circles[idx]
      const evt = document.createEvent('MouseEvents')
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      circle.dispatchEvent(evt)
    })
    .strategy(gremlins.strategies.distribution()
      .delay(100)
      .distribution([
        0.8,
        0.04,
        0.04,
        0.04,
        0.08
      ])
    )

  return horde
}

export {
  getGremlin
}