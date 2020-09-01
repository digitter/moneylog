import * as React from 'react'
import { connect } from 'react-redux'
import { History } from 'history'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { userSignin } from '../../services/UserService'
import Asset from '../../models/Asset'
import ExpenditureLog from '../../models/ExpenditureLog'
import IncomeLog from '../../models/IncomeLog'
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editExpenditureLogs, actionTypes as expenditureActionTypes, editExpenditureLog } from '../../modules/ExpenditureLogModule'
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'
import { Link } from 'react-router-dom'

interface LoginProps {
  history: History
  editUser: typeof editUser
  editAssets: typeof editAssets
  editExpenditureLogs: typeof editExpenditureLogs
  editIncomeLogs: typeof editIncomeLogs
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
      .then((jsonApiFormat: any) => {
        if (jsonApiFormat.data.type === 'user') { this.props.editUser(jsonApiFormat.data) }

        this.props.editUser(jsonApiFormat.data.attributes)
        this.props.editAssets(Asset.fromIncluded(jsonApiFormat))
        this.props.editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat))
        this.props.editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat))
      })
      .then(() => this.props.history.replace('/'))
      .catch(error => console.error('login error', error))
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>

        <Link to='/'>LINK</Link>

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
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser: editUser,
      editAssets: editAssets,
      editExpenditureLogs: editExpenditureLogs,
      editIncomeLogs: editIncomeLogs
    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
