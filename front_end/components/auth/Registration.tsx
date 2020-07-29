import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userSignup } from '../../services/UserService'
import { setUser } from '../../modules/UserModule'
import { notify } from '../../GlobalMessage'

interface Props {
  history: any
  setUser: typeof setUser
  user: any
}
interface State {
}

class Registration extends React.Component<Props, State> {
  state = {
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

    const user = { name, email, password, password_confirmation }

    userSignup(user)
      .then(response => {
        if (response.data.user) {
          this.props.setUser(response.data.user)

          notify(`はじめまして ${response.data.user.name} !`)
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
        <h2>Signup</h2>
        {this.props.user ? this.props.user.name : null}
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


const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUser: setUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
