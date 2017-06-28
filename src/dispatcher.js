import { buttonAction, armAction } from './action'

export function dispatcherFactory(present) {
  return function dispatch(eventName, payload) {
    switch (eventName) {
      case 'channel':
        buttonAction(payload, present)
        break
      case 'arm':
        armAction(payload, present)
        break
      default:
        console.error('Unknown event dispatched:', eventName)
    }
  }
}
