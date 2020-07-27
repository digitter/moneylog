import * as React from 'react'
import { connect } from 'react-redux'
import Login from './auth/Login'
import Registration from './auth/Registration'
import { bindActionCreators } from 'redux'

interface Props {
  firstUrl: string
  history: any
  user: any
  isLoggedIn: any
}

interface State {
}

class Top extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Login history={this.props.history} firstUrl={this.props.firstUrl} />
        <Registration history={this.props.history} firstUrl={this.props.firstUrl} />
     </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Top)
