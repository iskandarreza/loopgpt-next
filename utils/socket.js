import { store } from '@/store/store'
import {
  APPEND_WEBSOCKET_MESSAGES,
  SET_WEBSOCKET,
  SET_WEBSOCKET_CONNECTED,
  SET_WEBSOCKET_DISCONNECTED,
} from '@/store/types'
import { io } from 'socket.io-client'
import { handleMessage } from './handleMessage'

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

  socket.on('connect', () => {
    store.dispatch({ type: SET_WEBSOCKET_CONNECTED })

    handleStartLoop(socket)
  })

  socket.on('disconnect', () => {
    store.dispatch({ type: SET_WEBSOCKET_DISCONNECTED })
  })

  handleIncomingMessages(socket)
}

function handleStartLoop(socket) {
  const state = store.getState()
  const { agentState, configState } = state
  const { config } = agentState
  const { settings } = configState
  const { maxcycles } = settings

  const { name, goals } = config

  const startOptions = {
    max_cycles: parseInt(maxcycles),
    config: JSON.stringify(config),
  }

  if (!name || !goals) {
    alert('Please configure the agent or upload a config file!')
  } else {
    socket.emit('start', startOptions)

    // store.dispatch({type: APPEND_WEBSOCKET_MESSAGES, payload: {init_state: {config, startOptions}}})
  }
  console.log({
    agentState,
    configState,
    startOptions,
  })
}

function handleIncomingMessages(socket) {
  const props = [
    'init_state',
    'message',
    'init_resp_config',
    'is_instance_config',
    'task_complete_config',
    'run_tool_config',
    'max_cycles_config',
    'no_command_config',
  ]

  props.forEach((prop) => {
    const exclusions = ['init_state', 'message']
    let label = prop.toString()
    if (!exclusions.includes(prop)) {
      label = prop.toString().slice(0, -7)
    }

    socket.on(prop, (message) => {
      handleMessage(message, label)
    })
  })
}
