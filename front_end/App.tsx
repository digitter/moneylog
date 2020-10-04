import * as React from 'react'
import { Provider } from 'react-redux'
import store, { history } from './modules/store'

// Router
import { ConnectedRouter } from 'connected-react-router'

import Routing from './Routing'

interface state {
}
interface props {
}

export default class App extends React.Component<state, props> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routing history={history} />
        </ConnectedRouter>
      </Provider>
    )
  }
}
