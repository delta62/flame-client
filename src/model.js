import { uuid } from './uuid'
import { post } from './http'

const valSymbol = Symbol('modelValues')
const stateSymbol = Symbol('modelStateFn')
const defaultProps = {
  lock:     false,
  lockId:   uuid(),
  channels: [ false, false, false ]
}

class Model {
  constructor(props, onChangeFn) {
    this[valSymbol] = Object.assign({ }, props)
    this[stateSymbol] = onChangeFn
  }

  present(data) {
    if (data.channel !== undefined
        && this[valSymbol].channels[data.channel] !== data.state) {
      this[valSymbol].channels[data.channel] = data.state
      const body = { state: data.state, lockId: this[valSymbol].lockId }
      post(`/burner/channel/${data.channel}`, body)
      this[stateSymbol](this[valSymbol])
    }

    if (data.lock !== undefined && data.lock !== this[valSymbol].lock) {
      this[valSymbol].lock = data.state
      const body = {
        state: data.lock ? 'LOCKED' : 'UNLOCKED',
        lockId: this[valSymbol].lockId
      }
      post('/burner/lock', body)
      this[stateSymbol](this[valSymbol])
    }
  }
}

export function modelFactory(onChange) {
  return new Model(defaultProps, onChange)
}
