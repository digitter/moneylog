import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from './auth/Login'
import Registration from './auth/Registration'

interface Props {
  history: any
  user: any
  isLoggedIn: any
}

interface State {
}

class Top extends React.Component<Props, State> {
  componentDidMount() {
    this.props.history.replace('/')
  }

  render() {
    return (
      <React.Fragment>
        <Login />
        <Registration />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
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
