import * as React from 'react'
import { Provider } from 'react-redux'
import store, { history } from './modules/store'

// Router
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Hello from './components/Hello'
import Auth from './components/auth/Auth'

interface state {
}
interface props {
}

export default class App extends React.Component<state, props> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Auth>
              <Route path='/' render={() => <Hello></Hello>} />
            </Auth>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
