import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from './auth/Login'
import Registration from './auth/Registration'

interface Props {
  user: any
  isLoggedIn: any
}

interface State {
}

class Top extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <Login />
          <Registration />
        </React.Fragment>
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
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Top)
