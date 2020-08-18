import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import Top from './components/Top'
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
          <Route exact path="/top" component={Top} />

          <Auth>
            {/* <Switch> */}
              <Redirect from='/' to='/hello' />
              <Route exact path="/hello" component={Hello} />
            {/* </Switch> */}
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
