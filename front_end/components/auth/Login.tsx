import * as React from 'react'
import axios from 'axios'

interface LoginProps {
  handleSuccessfullAuth: (data: any) => void
}
interface LoginState {
  email: string
  password: string
}

const http = axios.create({ withCredentials: true })

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('auth-token')
  config.headers['X-CSRF-Token'] = token
  config.headers['Content-Type'] = 'application/json'

  return config
})

http.interceptors.response.use((response) => {
  const token = response.headers['x-csrf-token']
  window.localStorage.setItem('auth-token', token)

  return response
})

export default class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
    loginErrors: ''
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    } as any)
  }

  handleSubmit = (event: any) => {
    const {
      email,
      password
    } = this.state

    http.post(
      'http://localhost:3000/api/v1/sessions',
      {
        user: {
          email: email,
          password: password
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        this.props.handleSuccessfullAuth(response.data)
      }
    }).catch(error => {
      console.error('login error', error)
    })

    event.preventDefault()
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
