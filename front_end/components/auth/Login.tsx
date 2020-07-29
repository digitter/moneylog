import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userSignin } from '../../services/UserService'
import { setUser } from '../../modules/UserModule'
import { showMessage } from '../../modules/CommonModule'
import { notify } from '../../GlobalMessage'

interface LoginProps {
  history: any
  setUser: typeof setUser
  user: any
}
interface LoginState {
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
    loginErrors: ''
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = (event: any) => {
    event.preventDefault()

    const {
      email,
      password
    } = this.state

    const user = { email, password }

    userSignin(user)
      .then(response => {
        if (response.data.user) {
          this.props.setUser(response.data.user)

          notify(`こんにちは ${response.data.user.name} !`)
        }
      }).then(() => {
        this.props.history.push('/hello')
      })
      .catch(error => {
        console.error('login error', error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        { this.props.user ? this.props.user.name : null}

        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            defaultValue={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Passowrd'
            defaultValue={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type='submit'>Login</button>
        </form>
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
      setUser: setUser,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
