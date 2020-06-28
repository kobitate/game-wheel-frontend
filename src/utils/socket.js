import io from 'socket.io-client'

export default class Socket {
  constructor () {
    this.init = io(process.env.REACT_APP_BACKEND_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    })
  }

  io () {
    return this.init
  }
}
