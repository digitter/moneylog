import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from './auth/Logout'
import Cancellation from './auth/Cancellation'
import User from '../models/User'

interface HelloProps {
  user: User
}

interface HelloState {
}

class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    return (
      <React.Fragment>
        <h2>Hello boilerplate</h2>
        <p>{this.props.user ? this.props.user.name : null}</p>
        <img src ="/public/hello.png" style={{width: 200, height: 200}} />
        <Logout />
        <Cancellation />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
