import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'

import { bindActionCreators } from 'redux'
import { fetchUser } from './services/UserService'
import { setUser } from './modules/UserModule'

import Top from './components/Top.'
import Auth from './components/auth/Auth'
import Hello from './components/Hello'

interface Props {
  history: any
  user: any
  setUser: typeof setUser
}
interface State {
  loggedInStatus: string
}

class Routing extends React.Component<Props, State> {
  state = {
    loggedInStatus: "LOGGED_IN",
  }

  async checkLoginStatus() {
    fetchUser()
      .then(response => {
        if (response.data.user) {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
          })

          this.props.setUser(response.data.user)
        } else if (!response.data.user) {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
          })
        }
      }).catch(error => {
        console.error('check login error', error)
      })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          this.props.user
            ? <Route exact path="/" render={()=> this.props.history.push('/hello')}/>
            : <Route exact path="/" render={()=> this.props.history.push('/top')}/>

          <Route path="/top" component={() => <Top history={this.props.history} />} />

          <Auth loggedInStatus={this.state.loggedInStatus}>
            <Switch>
              <Route path='/hello' render={() => <Hello />} />
              <Route render={() => (<h3>Error404Page: No pages to show...</h3>)} />
            </Switch>
          </Auth>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUser: setUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
