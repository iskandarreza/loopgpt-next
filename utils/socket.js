import { io } from 'socket.io-client'

let socket

export const getSocket = (connection) => {
  if (!socket) {
    socket = io(connection)
  }
  return socket
}
