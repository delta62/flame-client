import h from 'virtual-dom/h'

export function appView({ armed }, dispatch) {
  return h('div.app', [
    sliderView({ armed }, dispatch),
    fireButtonsView(null, dispatch)
  ])
}

function sliderView({ armed }, dispatch) {
  return h('div.slider', [
    h('span.slider-track'),
    h('span.slider-handle', {
      onclick: () => dispatch('arm', !armed)
    })
  ])
}

function fireButtonsView(_, dispatch) {
  return h('div.buttons', Array.range(3).map(i => {
    return fireButtonView({ channel: i, text: 'FIRE' }, dispatch)
  }))
}

function fireButtonView({ channel, text }, dispatch) {
  return h('div.button', {
    onmousedown:  () => dispatch('channel', { channel, state: true  }),
    onmouseup:    () => dispatch('channel', { channel, state: false }),
    ontouchstart: () => dispatch('channel', { channel, state: true  }),
    ontouchend:   () => dispatch('channel', { channel, state: false }),
    onmouseout:   () => dispatch('channel', { channel, state: false })
  }, [ text ])
}
