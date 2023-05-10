import { store } from '@/store/store'
import {
  APPEND_WEBSOCKET_MESSAGES,
  SAVE_AGENT_STATE,
  SET_WEBSOCKET,
  SET_WEBSOCKET_CONNECTED,
  SET_WEBSOCKET_DISCONNECTED,
} from '@/store/types'
import { io } from 'socket.io-client'

let socket

export const getSocket = (connection) => {
  const state = store.getState((state) => state.socketStates)
  if (!state.isConnected) {
    socket = io(connection)
    store.dispatch({ type: SET_WEBSOCKET, payload: socket })
  }
  return socket
}

export function setupSocketEventListeners(socket) {
  if (!socket) return

  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
    store.dispatch({ type: SET_WEBSOCKET_CONNECTED })
    socket.emit('start', {
      name: '3148-Graceful-Sprint',
      // max_cycles: inputValue ? inputValue : 1,
      max_cycles: 1,
      // goals: !!goals && goals,
      // constraints: !!constraints && constraints,
    })
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
    store.dispatch({ type: SET_WEBSOCKET_DISCONNECTED })
  })

  function handleMessage(property, message) {
    store.dispatch({
      type: APPEND_WEBSOCKET_MESSAGES,
      payload: { [property]: message },
    })
  }

  socket.on('init_state', (message) => handleMessage('init_state', message))
  socket.on('init_thoughts', (message) =>
    handleMessage('init_thoughts', message)
  )
  socket.on('this_cycle', (message) => handleMessage('this_cycle', message))
  socket.on('message', (message) => handleMessage('message', message))
  socket.on('current_state', (message) => {
    store.dispatch({ type: SAVE_AGENT_STATE, payload: message })
  })
}
