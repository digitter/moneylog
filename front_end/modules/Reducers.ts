import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import commonReducer from './CommonModule'
import userReducer from './UserModule'

const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  common: commonReducer,
  user: userReducer
})

export default reducers
