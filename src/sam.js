import h from 'virtual-dom/h'
import Delegator from 'dom-delegator'
import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

(function() {
  const model = { };

  model.present = function(data) {
    console.log('model present')
    state(model)
    model.persist()
  }

  model.persist = function() {
    console.log('model persist')
  }

  function myAction(data) {
    console.log('myAction', data)
    present(data)
  }

  function state(model) {
    console.log('state')
    stateRepresentation(model)
    nap(model)
  }

  function nap(model) {
    console.log('nap')
  }

  function myView(model) {
    console.log('myView')
    const dom = h('h1', {
      'ev-click': myAction
    }, 'Hello SAM')
    display(dom)
  }

  function present(data) {
    console.log('present')
    model.present(data)
  }

  function stateRepresentation(model) {
    console.log('stateRepresentation')
    myView(model)
  }

  /**
   * Render the virtual DOM out to the page
   * @param {VTree} view The virtual DOM tree to render
   */
  let rootNode
  function display(view) {
    console.log('display')
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
  myView(model)
}())
