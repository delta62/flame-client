import './util'

import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

import { state } from './state'
import { modelFactory } from './model'
import { appView } from './components'
import { dispatcherFactory } from './dispatcher'

export function bootstrap(el, rootView, config) {
  const model = modelFactory(onChange)
  const dispatch = dispatcherFactory(model.present.bind(model))
  let rootNode = null

  function onChange(model) {
    const stateRepresentation = state(model)
    render(rootView, stateRepresentation)
  }

  function render(view, state) {
    const renderedView = view(state, dispatch)
    if (!rootNode) {
      rootNode = createElement(renderedView)
      el.appendChild(rootNode)
    } else {
      const patches = diff(renderedView, rootNode)
      rootNode = patch(rootNode, patches)
    }
  }

  render(appView, state(model))
}
