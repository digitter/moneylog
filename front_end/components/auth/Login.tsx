import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userSignin } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'
import User from '../../models/User'

interface LoginProps {
  editUser: typeof editUser
  user: User
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
      .then(user => {
        if (user) { this.props.editUser(user) }
        window.location.pathname = '/hello'
      })
      .catch(error => {
        console.error('login error', error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>

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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser: editUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
