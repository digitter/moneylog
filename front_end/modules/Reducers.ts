import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import commonReducer from './CommonModule'
import userReducer from './UserModule'
import assetsReducer from './AssetModule'
import expenditureLogsReducer from './ExpenditureLogModule'

const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  common: commonReducer,
  user: userReducer,
  assets: assetsReducer,
  expenditureLogs: expenditureLogsReducer
})

export default reducers
