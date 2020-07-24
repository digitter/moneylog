import * as React from 'react'
import Axios from '../../Axios'

interface Props {
  handleSuccessfullAuth: (data: any) => void
}
interface State {
}

export default class Registration extends React.Component<Props, State> {
  state = {
    user: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = () => {
    event.preventDefault()

    const {
      name,
      email,
      password,
      password_confirmation
    } = this.state

    Axios.post(
      'http://localhost:3000/api/v1/registrations',
      {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
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
        <h2>Signup</h2>
        {this.state.user ? this.state.user.name : null}
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            defaultValue={this.state.name}
            onChange={this.handleChange}
            required
          />

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

          <input
            type='password'
            name='password_confirmation'
            placeholder='Passowrd_confirmation'
            defaultValue={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type='submit'>Signup</button>
        </form>
      </React.Fragment>
    )
  }
}
