import { RESTORE_AGENT_STATE, SAVE_AGENT_STATE } from '../types'

const initialState = {
  config: {},
  stateHistory: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_AGENT_STATE:
      return {
        ...state,
        stateHistory: [...state.agentState.stateHistory, action.payload],
      }

    case RESTORE_AGENT_STATE:
      return {
        ...state,
        config: action.payload,
      }

    default:
      return state
  }
}
