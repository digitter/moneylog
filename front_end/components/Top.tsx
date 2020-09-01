import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

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
        <p><Link to='/signin'>Signin</Link></p>
        <p><Link to='/signup'>Signup</Link></p>
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
