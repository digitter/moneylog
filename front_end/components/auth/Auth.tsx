import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../services/UserService'
import { setUser } from '../../modules/UserModule'
import { setInLoading } from '../../modules/CommonModule'
import Login from './Login'
import Registration from './Registration'
import Logout from './Logout'
import LoadingIcon from '../LoadingIcon'

interface Props {
  setUser: typeof setUser
  setInLoading: typeof setInLoading
  user: any
  isLoggedIn: any
}
interface State {
  loggedInStatus: string
}

class Auth extends React.Component<Props, State> {
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

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    })
  }

  handleSuccessfullAuth = (data: any) => {
    this.handleLogin(data);
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedInStatus === 'LOGGED_IN' ?
            this.props.user
              ? <Route children={this.props.children} />
              : <LoadingIcon />
          : <Redirect to='/top' />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUser: setUser,
      setInLoading: setInLoading
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
