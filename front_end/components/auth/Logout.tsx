import * as React from 'react'
import Axios from '../../Axios'

interface Props {
  handleSuccessfullAuth: (data: any) => void
}

interface State {
}

export default class Logout extends React.Component<Props, State> {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = (event: any) => {
    // event.preventDefault()

    const {
      email,
      password
    } = this.state

    Axios.delete(
      'http://localhost:3000/api/v1/logout',
      {
        data: {
          email,
          password
        }
      }
    ).then(res => {
      console.log('res >>>', res)
    })
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <h2>Logout</h2>
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

            <button type='submit'>Logout</button>
          </form>
        </React.Fragment>
      </div>
    )
  }
}
