import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { fetchUser } from './services/UserService'
import { setUser } from './modules/UserModule'
import { showMessage } from './modules/CommonModule'

import Top from './components/Top.'
import Auth from './components/auth/Auth'
import Hello from './components/Hello'

interface Props {
  history: any
  user: any
  setUser: typeof setUser
}
interface State {
  loggedInStatus: string
}

class Routing extends React.Component<Props, State> {
   async checkUserLoggedIn() {
    fetchUser()
      .then(response => {
        if (response.data.user) {
          this.props.setUser(response.data.user)
        }
      }).catch(error => {
        console.error('check login error', error)
      })
  }

  async componentDidMount() {
    await this.checkUserLoggedIn()
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          this.props.user
            ? <Route exact path="/" render={()=> this.props.history.push('/hello')}/>
            : <Route exact path="/" render={()=> this.props.history.push('/top')}/>

          <Route path="/top" component={() => <Top history={this.props.history} />} />

          <Auth>
            <Switch>
              <Route path='/hello' render={() => <Hello />} />
              <Route render={() => (<h3>Error404Page: No pages to show...</h3>)} />
            </Switch>
          </Auth>
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
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
