import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import commonReducer from './CommonModule'
import userReducer from './UserModule'
import assetsReducer from './AssetModule'
import ExpenditureLogsReducer from './ExpenditureLogModule'
import IncomeLogsReducer from './IncomeLogModule'
import MonthlyExpendituresReducer from './MonthlyExpenditureModule'

const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  common: commonReducer,
  user: userReducer,
  assets: assetsReducer,
  expenditureLogs: ExpenditureLogsReducer,
  incomeLogs: IncomeLogsReducer,
  monthlyExpenditures: MonthlyExpendituresReducer
})

export default reducers
