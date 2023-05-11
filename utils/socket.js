import { store } from '@/store/store'
import {
  APPEND_WEBSOCKET_MESSAGES,
  SAVE_AGENT_STATE,
  SET_AGENT_INIT_STATE,
  SET_WEBSOCKET,
  SET_WEBSOCKET_CONNECTED,
  SET_WEBSOCKET_DISCONNECTED,
  UPDATE_AGENT_CYCLE_STATE,
  UPDATE_CYCLE_COUNT,
} from '@/store/types'
import { io } from 'socket.io-client'

export const getSocket = (connection) => {
  const state = store.getState((state) => state.socketStates)
  const { socket, isConnected } = state
  if (!socket) {
    const newSocket = io(connection)
    setupSocketEventListeners(newSocket)
    store.dispatch({ type: SET_WEBSOCKET, payload: newSocket })
    return newSocket
  } else {
    if (isConnected) {
      console.log(state.socket)
    } else {
      socket.removeAllListeners()
      socket.connect()
    }
    return socket
  }
}

export function setupSocketEventListeners(socket) {
  if (!socket) return

  const config = store.getState((state) => state.agentState.config)
  const { name, goals, constraints } = config

  socket.on('connect', () => {
    store.dispatch({ type: SET_WEBSOCKET_CONNECTED })
    socket.emit('start', {
      name: name ? name : '3148-Graceful-Sprint',
      max_cycles: 2,
      // goals: !!goals && goals,
      constraints: !!constraints && constraints,
    })
  })

  socket.on('disconnect', () => {
    store.dispatch({ type: SET_WEBSOCKET_DISCONNECTED })
  })

  function handleMessage(property, message) {
    store.dispatch({
      type: APPEND_WEBSOCKET_MESSAGES,
      payload: { [property]: message },
    })
  }

  socket.on('init_state', (message) => {
    // handleMessage('init_state', message)
    store.dispatch({ type: SET_AGENT_INIT_STATE, payload: message })
  })
  socket.on('init_thoughts', (message) => {
    handleMessage('init_thoughts', message)
    store.dispatch({ type: UPDATE_CYCLE_COUNT })
  })
  socket.on('this_cycle', (message) => {
    handleMessage('this_cycle', message)
    store.dispatch({ type: UPDATE_AGENT_CYCLE_STATE, payload: message })
  })
  socket.on('message', (message) => handleMessage('message', message))
  socket.on('current_state', (message) => {
    store.dispatch({ type: SAVE_AGENT_STATE, payload: message })
  })
}
