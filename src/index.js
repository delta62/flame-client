import { bootstrap } from './sam'
import { appView } from './components'

const config = {
  baseUrl: 'http://192.168.1.3:8080'
}
bootstrap(
  document.getElementById('view'),
  appView,
  config)
