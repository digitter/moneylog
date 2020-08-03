import reducers from './Reducers'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

const basename = '/'
export const history = createBrowserHistory({ basename })

const initialState = {}
const enhancers = []

const middlewares = [
  routerMiddleware(history),
  reduxThunk
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // Browserの拡張機能にReduxDevToolが存在するか
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const store = createStore(
  reducers(history), // router reducer with route state
  initialState,
  composedEnhancers,
)

export default store
