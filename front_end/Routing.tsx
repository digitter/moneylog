import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { fetchUser } from './services/UserService'
import { setUser, unsetUser } from './modules/UserModule'
import User from './models/User'

import Top from './components/Top.'
import Hello from './components/Hello'
import LoadingIcon from './components/LoadingIcon'

interface Props {
  history: any
  user: User
  setUser: typeof setUser
  unsetUser: typeof unsetUser
}
interface State {
  loggedInStatus: string
}

class Routing extends React.Component<Props, State> {
  state = {
    loggedInStatus: 'LOGGED_IN'
  }

  async checkLoginStatus() {
    fetchUser()
      .then(user => {
        if (user) {
          this.props.setUser(user)
          this.setState({ loggedInStatus: 'LOGGED_IN' })
        }
        else if (!user) {
          this.setState({ loggedInStatus: 'NOT_LOGGED_IN' })
          this.props.unsetUser()
        }
      }).catch(error => {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN'})
        this.props.unsetUser()
        console.error('check login error', error)
      })
  }

  async componentDidMount() {
    await this.checkLoginStatus()
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={
              this.state.loggedInStatus === 'LOGGED_IN' ?
                this.props.user
                  ? Hello
                  : LoadingIcon
                : Top
          }/>

          <Route path="/hello" component={
              this.state.loggedInStatus === 'LOGGED_IN' ?
                this.props.user
                  ? Hello
                  : LoadingIcon
                : Top
          }/>

          {/* <Route path="/top" render={() => <Top />} /> */}
          <Route path="/top" component={Top} />
          <Route render={() => (<h3>Error404Page: No pages to show...</h3>)} />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUser: setUser,
      unsetUser: unsetUser,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
