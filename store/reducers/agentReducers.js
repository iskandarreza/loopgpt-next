import { RESTORE_AGENT_STATE, SAVE_AGENT_STATE } from '../types'

const initialState = {
  agentState: {
    config: null,
    state_history: [],
  },
}

export default function (state = initialState, action) {
  console.log({ state, action })

  switch (action.type) {
    case SAVE_AGENT_STATE:
      return {
        ...state,
        agentState: {
          state_history: [...state.agentState.state_history, action.payload],
        },
      }

    case RESTORE_AGENT_STATE:
      return {
        ...state,
        agentState: {
          config: action.payload,
        },
      }

    default:
      return state
  }
}
