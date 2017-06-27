import h from 'virtual-dom/h'
import Delegator from 'dom-delegator'
import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

import { uuid } from './uuid'
import { post } from './http'

(function() {
  const model = {
    lock:     false,
    lockId:   uuid(),
    channels: [ false, false, false ]
  };

  model.present = function(data) {
    if (data.channel !== undefined
        && model.channels[data.channel] !== data.state) {
      model.channels[data.channel] = data.state
      const body = { state: data.state, lockId: model.lockId }
      post(`/burner/channel/${data.channel}`, body)
    }

    if (data.lock !== undefined && data.lock !== model.lock) {
      model.lock = data.state
      const body = {
        state: data.lock ? 'LOCKED' : 'UNLOCKED',
        lockId: model.lockId
      }
      post('/burner/lock', body)
    }

    state(model)
    // model.persist()
  }

  function state(model) {
    stateRepresentation(model)
    nap(model)
  }

  function nap(model) {
  }

  function appView(model) {
    const dom = h('div.app', [
      sliderView(model),
      fireButtonView(model)
    ])
    display(dom)
  }

  function sliderView(model) {
    const dom = h('div.slider', [
      h('span.slider-track'),
      h('span.slider-handle', {
        'ev-click': () => armAction(!model.lock)
      })
    ])
    return dom
  }

  function fireButtonView(model) {
    const dom = h('div.buttons', [
      h('div.button', {
        'ev-mousedown': () => buttonAction({ channel: 0, state: true }),
        'ev-mouseup':   () => buttonAction({ channel: 0, state: false })
      }, [ 'FIRE' ]),
      h('div.button', {
        'ev-mousedown': () => buttonAction({ channel: 1, state: true }),
        'ev-mouseup':   () => buttonAction({ channel: 1, state: false })
      }, [ 'FIRE' ]),
      h('div.button', {
        'ev-mousedown': () => buttonAction({ channel: 2, state: true }),
        'ev-mouseup':   () => buttonAction({ channel: 2, state: false })
      }, [ 'FIRE' ])
    ])
    return dom
  }

  function armAction(isLocked) {
    present({ lock: isLocked })
  }

  function buttonAction(data) {
    present(data)
  }

  function present(data) {
    model.present(data)
  }

  function stateRepresentation(model) {
    // appView(model)
  }

  /**
   * Render the virtual DOM out to the page
   * @param {VTree} view The virtual DOM tree to render
   */
  let rootNode
  function display(view) {
    if (!rootNode) {
      rootNode = createElement(view)
      const domNode = document.getElementById('view')
      domNode.appendChild(rootNode)
    } else {
      const patches = diff(view, rootNode)
      rootNode = patch(rootNode, patches)
    }
  }

  // Required for ev-* nodes in h()
  Delegator(document.body)
  appView(model)
}())
