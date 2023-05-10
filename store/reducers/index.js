import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import agentReducers from './agentReducers'
import socketReducer from './socketReducer'

export default combineReducers({
  uiStates: uiReducer,
  socketStates: socketReducer,
  agentStates: agentReducers,
})
