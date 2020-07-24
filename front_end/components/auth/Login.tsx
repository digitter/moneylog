import * as React from 'react'
import Axios from '../../Axios'

interface LoginProps {
  handleSuccessfullAuth: (data: any) => void
}
interface LoginState {
}

export default class Login extends React.Component<LoginProps, LoginState> {
  state = {
    user: null,
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

    Axios.post(
      'http://localhost:3000/api/v1/sessions',
      {
        user: {
          email,
          password
        }
      }
    ).then(response => {
      if (response.data.user) {
        this.setState({ user: response.data.user })
        this.props.handleSuccessfullAuth(response.data)
      }
    }).catch(error => {
      console.error('login error', error)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        { this.state.user ? this.state.user.name : null}

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
