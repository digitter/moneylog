import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import commonReducer from './CommonModule'

const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  common: commonReducer
})

export default reducers
