import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userSignout } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'

interface Props {
  editUser: typeof editUser
  history: any
}

interface State {
}

class Logout extends React.Component<Props, State> {

  handleSignoutClick = () => {
    userSignout()
      .then(() => {
        this.props.editUser(null)
        window.location.href = '/'
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Signout</h2>
        <button onClick={this.handleSignoutClick} >
          Signout
        </button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser: editUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
