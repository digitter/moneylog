import * as React from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import axios from 'axios'

interface Props {
}
interface State {
}

export default class Auth extends React.Component<Props, State> {
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  }

  checkLoginStatus() {
    axios.get(
      'http://localhost:3000/api/v1/logged_in',
      { withCredentials: true }
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
    console.log('auth successfully !!!')
  }

  render() {
    return (
      <React.Fragment>
        <Route children={this.props.children} />
        <Login handleSuccessfullAuth={this.handleSuccessfullAuth} />
        {/* <Registration handleSuccessfullAuth={this.handleSuccessfullAuth} /> */}
      </React.Fragment>
    )
  }
}
