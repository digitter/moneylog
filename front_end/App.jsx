import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store, { history } from './modules/store'

// Router
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Hello from './modules/Hello'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' render={() => <Hello></Hello>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
