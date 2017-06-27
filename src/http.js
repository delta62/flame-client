const baseUrl = 'http://192.168.1.3:8080'

export function post(path, body) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  body = JSON.stringify(body)
  const init = { method: 'POST', mode: 'cors', headers, body }
  const req = new Request(`${baseUrl}${path}`)
  return fetch(req, init)
}
