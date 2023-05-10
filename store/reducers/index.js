import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import agentReducers from './agentReducers'

export default combineReducers({
  uiStates: uiReducer,
  agentStates: agentReducers,
})
