import { io } from 'socket.io-client'

let socket

export const getSocket = (connection) => {
  if (!socket) {
    socket = io(connection)
    console.log("new socket", socket)
    
  } else {
    
    if (socket.disconnected) {
      socket.connect()
    } else {
      console.log("existing socket", socket)
    }
  }

  return socket
}
