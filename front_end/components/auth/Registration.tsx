import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userSignup } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import User from '../../models/User'

interface Props {
  history: any
  editUser: typeof editUser
  editAssets: typeof editAssets
  user: User
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
      .then((jsonApiFormat: any) => {
        if (jsonApiFormat.data.type === 'user') { this.props.editUser(jsonApiFormat.data) }

        if (jsonApiFormat.data.relationships.asset) {
          const assets = jsonApiFormat.included.filter(obj => {
            return obj.type === 'asset'
          })

          this.props.editAssets(assets[0].attributes)
        }
      }).then(() => {
        window.location.href = '/'
      })
      .catch(error => {
        console.error('login error', error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Signup</h2>

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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser: editUser,
      editAssets: editAssets
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
