import h from 'virtual-dom/h'

export function appView(state, dispatch) {
  return h('div.app', [
    sliderView(state, dispatch),
    fireButtonsView(null, dispatch)
  ])
}

function sliderView({ armed }, dispatch) {
  function startDrag(e) {
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const currentTarget = e.currentTarget || e.target
    const track     = currentTarget.parentNode.querySelector('.slider-track'),
          handle    = currentTarget,
          trackRect = track.getBoundingClientRect(),
          maxX      = trackRect.width,
          threshold = (maxX + trackRect.left) * .75,
          handlePos = clientX - handle.getBoundingClientRect().left

    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', stopDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('mouseleave', stopDrag)

    function stopDrag(e) {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('mouseleave', stopDrag)

      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX

      handle.style.transition = 'left .4s'
      handle.style.left = clientX >= threshold ? `${maxX}px` : '0px'
      setTimeout(() => handle.style.transition = '', 400)
      dispatch('arm', { armed: clientX >= threshold })
    }

    function onMove(e) {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      let x = clientX - handlePos
      x = Math.max(0, x)
      x = Math.min(maxX, x)
      handle.style.left = `${x}px`
    }
  }

  return h('div.slider', [
    h('span.threshold'),
    h('span.label.label-1', [ 'off' ]),
    h('span.label.label-2', [ 'on' ]),
    h('span.slider-track', [
      h('span.dot'),
      h('span.dot.dot-right')
    ]),
    h('span.slider-handle', {
      onmousedown: startDrag,
      ontouchstart: startDrag
    }, [
      h('span.score.score-1'),
      h('span.score.score-2'),
      h('span.score.score-3')
    ])
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
