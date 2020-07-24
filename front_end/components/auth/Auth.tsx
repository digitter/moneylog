import * as React from 'react'
import { Route } from 'react-router-dom'
import Axios from '../../Axios'
import Login from './Login'
import Registration from './Registration'
import Logout from './Logout'

interface Props {
}
interface State {
  loggedInStatus: string
  user: any
}

export default class Auth extends React.Component<Props, State> {
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: null
  }

  checkLoginStatus() {
    Axios.get(
      'http://localhost:3000/api/v1/logged_in',
      ).then(response => {
        if (response.data.logged_in && this.state.loggedInStatus == 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus == 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          })
        }
      }).catch(error => {
        console.error('check login error', error)
      })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    })
  }

  handleSuccessfullAuth = (data: any) => {
    this.handleLogin(data);
  }

  render() {
    return (
      <React.Fragment>
        <Route children={this.props.children} />

        <h1>{this.state.user ? this.state.user.name : null}</h1>
        <h1>{this.state.loggedInStatus ? this.state.loggedInStatus : null}</h1>
        <Login handleSuccessfullAuth={this.handleSuccessfullAuth} />
        <Registration handleSuccessfullAuth={this.handleSuccessfullAuth} />
        <Logout handleSuccessfullAuth={this.handleSuccessfullAuth} />
      </React.Fragment>
    )
  }
}
