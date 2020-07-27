import * as React from 'react'
import { Provider } from 'react-redux'
import store, { history } from './modules/store'

// Router
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Hello from './components/Hello'
import Auth from './components/auth/Auth'
import Top from './components/Top.'

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
              <Route exact path="/" render={()=> history.push('/top')}/>
              <Route path="/top" component={() => <Top history={history} />} />
            <Auth>
                <Route path='/hello' render={() => <Hello />} />
            </Auth>
            <Route render={() => (<h3>Error404Page: No pages to show...</h3>)} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
