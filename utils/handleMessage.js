import { store } from '@/store/store'
import {
  APPEND_WEBSOCKET_MESSAGES,
  SAVE_AGENT_STATE,
  SET_AGENT_INIT_STATE,
  UPDATE_AGENT_CYCLE_STATE,
  UPDATE_CYCLE_COUNT,
} from '@/store/types'
import { parseHistory } from './parseHistory'

export function handleMessage(message, label) {
  if (!message) return
  const exclusions = ['init_state', 'message']
  console.log({ label, message })

  if (!exclusions.includes(label)) {
    const agentStateData = message
    const parsed = parseHistory(agentStateData)

    console.log({ agentStateData })

    if (!!parsed) {
      const {
        cycle,
        plan,
        state,
        staging_response,
        staging_tool,
        tool_response,
      } = agentStateData

      const parsedHistory = parsed.length > 2 ? parsed.slice(-3) : [...parsed]
      const agentResponse = parsedHistory
        .filter((v) => v.role === 'assistant')
        .pop().content

      const payload = {
        [label]: {
          agentResponse,
          parsedHistory,
          cycle,
          state,
          staging_response,
          staging_tool,
          tool_response,
          plan,
        },
      }

      console.log({ type: APPEND_WEBSOCKET_MESSAGES, payload })

      store.dispatch({ type: APPEND_WEBSOCKET_MESSAGES, payload })

      if (label === 'run_tool') {
        store.dispatch({ type: SAVE_AGENT_STATE, payload: agentStateData })
        store.dispatch({
          type: UPDATE_AGENT_CYCLE_STATE,
          payload: agentStateData,
        })
        store.dispatch({ type: UPDATE_CYCLE_COUNT })
      }

      if (label === 'init_resp') {
        store.dispatch({ type: SET_AGENT_INIT_STATE, payload: agentStateData })
        store.dispatch({ type: UPDATE_CYCLE_COUNT })
      }
    }
    // else {
    //   store.dispatch({
    //     type: APPEND_WEBSOCKET_MESSAGES,
    //     payload: { label: message },
    //   })
    // }
  } else {
    store.dispatch({
      type: APPEND_WEBSOCKET_MESSAGES,
      payload: { [label]: message },
    })
  }
}
