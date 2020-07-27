import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userSignout } from '../../services/UserService'
import { unsetUser } from '../../modules/UserModule'

interface Props {
  unsetUser: typeof unsetUser
  user: any
  history: any
}

interface State {
}

class Logout extends React.Component<Props, State> {

  handleSignoutClick = () => {
    userSignout()
      .then(() => {
        this.props.unsetUser()
        window.location.href = '/top'
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Signout</h2>
        <button onClick={this.handleSignoutClick} >
          Signout
        </button>
        {this.props.user ? this.props.user.name : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      unsetUser: unsetUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
