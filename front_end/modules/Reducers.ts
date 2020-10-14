import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

import commonReducer from './CommonModule'
import userReducer from './UserModule'
import assetsReducer from './AssetModule'
import ExpenditureLogsReducer from './ExpenditureLogModule'
import IncomeLogsReducer from './IncomeLogModule'
import MonthlyExpendituresReducer from './MonthlyExpenditureModule'
import TagsReducer from './TagModule'
import store from './store'

const reducers = (history: History) => combineReducers({
  router: connectRouter(history),
  common: commonReducer,
  user: userReducer,
  assets: assetsReducer,
  expenditureLogs: ExpenditureLogsReducer,
  incomeLogs: IncomeLogsReducer,
  monthlyExpenditures: MonthlyExpendituresReducer,
  tags: TagsReducer
})

export default reducers

type RootState = ReturnType<typeof store.getState>
type AddDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch: AddDispatch = useDispatch
