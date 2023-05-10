import {
  SET_WEBSOCKET,
  SET_WEBSOCKET_CONNECTED,
  SET_WEBSOCKET_DISCONNECTED,
} from '../types'

const initialState = {
  socketStates: {
    socket: null,
    isConnected: false,
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WEBSOCKET:
      return {
        ...state,
        socketStates: {
          ...state.socketStates,
          socket: action.payload,
        },
      }

    case SET_WEBSOCKET_CONNECTED:
      return {
        ...state,
        socketStates: {
          ...state.socketStates,
          isConnected: true,
        },
      }

    case SET_WEBSOCKET_DISCONNECTED:
      return {
        ...state,
        socketStates: {
          ...state.socketStates,
          isConnected: false,
        },
      }

    default:
      return state
  }
}
