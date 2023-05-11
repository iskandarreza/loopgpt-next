import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import agentReducers from './agentReducers'
import socketReducer from './socketReducer'
import cycleReducer from './cycleReducer'

export default combineReducers({
  uiStates: uiReducer,
  socketStates: socketReducer,
  agentState: agentReducers,
  cycleState: cycleReducer,
})
