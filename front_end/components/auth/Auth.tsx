import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../services/UserService'
import { setUser } from '../../modules/UserModule'
import Login from './Login'
import Registration from './Registration'
// import Logout from './Logout'

interface Props {
  setUser: typeof setUser
  user: any
}
interface State {
  loggedInStatus: string
  user: any
}

class Auth extends React.Component<Props, State> {
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: null
  }

  checkLoginStatus() {
    fetchUser()
      .then(response => {
        if (response.data.user && this.state.loggedInStatus == 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })

          this.props.setUser(response.data.user)
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

        <h1>{this.props.user ? this.props.user.name : 'No User'}</h1>
        <h1>{this.state.loggedInStatus ? this.state.loggedInStatus : null}</h1>
        <Login handleSuccessfullAuth={this.handleSuccessfullAuth} />
        <Registration handleSuccessfullAuth={this.handleSuccessfullAuth} />
        {/* <Logout handleSuccessfullAuth={this.handleSuccessfullAuth} /> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setUser: setUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
