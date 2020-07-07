import io from 'socket.io-client'

export default class Socket {
  constructor () {
    this.init = io(process.env.REACT_APP_BACKEND_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket', 'polling'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
      secure: true
    })
  }

  io () {
    return this.init
  }
}
