import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import Hello from './components/Hello'
import Auth from './components/auth/Auth'

interface Props {
  history: any
}
interface State {
}

class Routing extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Auth history={this.props.history}>
            <Switch>
              <Route exact path="/" component={Hello} />

              <Route path='/assets' component={Hello}>
                <Redirect from='assets/:id' to='/assets' />
                {/* <Route path='assets/:id' component={Hello} /> */}
                <Route path='*' component={Hello} />
              </Route>

              <Route path="*" render={() => <h1>No content</h1>} />
            </Switch>
          </Auth>

          <Redirect to='/' />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
