import { UPDATE_AGENT_STATE } from '../types'

const initialState = {
  agentState: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_AGENT_STATE:
      return {
        ...state,
        agentState: action.payload,
      }

    default:
      return state
  }
}
