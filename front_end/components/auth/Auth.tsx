import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser } from '../../modules/UserModule'
import { setInLoading } from '../../modules/CommonModule'
import LoadingIcon from '../LoadingIcon'

interface Props {
  setUser: typeof setUser
  setInLoading: typeof setInLoading
  user: any
  loggedInStatus: any
}
interface State {
}

class Auth extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {
          this.props.loggedInStatus === 'LOGGED_IN' ?
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
