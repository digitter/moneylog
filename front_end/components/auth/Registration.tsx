import * as React from 'react'
import { bindActionCreators } from 'redux'
import { History } from 'history'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Request
import { userSignup } from '../../services/UserService'
// Models
import User from '../../models/User'
import Asset from '../../models/Asset'
import MonthlyExpenditure from '../../models/MonthlyExpenditure'
import ExpenditureLog from '../../models/ExpenditureLog'
import IncomeLog from '../../models/IncomeLog'
// Redux module
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editMonthlyExpenditures, actionTypes as monthlyActionTypes } from '../../modules/MonthlyExpenditureModule'
import { editExpenditureLogs, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule'
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'
import { successMessage, succesmMessages } from '../../GlobalMessage'

interface Props {
  history: History
  user: User
  editUser: typeof editUser
  editAssets: typeof editAssets
  editMonthlyExpenditures: typeof editMonthlyExpenditures
  editExpenditureLogs: typeof editExpenditureLogs
  editIncomeLogs: typeof editIncomeLogs
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
        if (jsonApiFormat.data.type === 'user') { this.props.editUser(User.fromJsonApi(jsonApiFormat)) }

        this.props.editUser(jsonApiFormat.data.attributes)
        this.props.editAssets(Asset.fromIncluded(jsonApiFormat))
        this.props.editMonthlyExpenditures(monthlyActionTypes.initialize, MonthlyExpenditure.fromIncluded(jsonApiFormat))
        this.props.editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat))
        this.props.editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat))
      })
      .then(() => {
        this.props.history.replace('/')
        successMessage(succesmMessages.signup)
      })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <React.Fragment>
        <h2>Signup</h2>
        <Link to='/'>LINK</Link>

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
      editUser,
      editAssets,
      editMonthlyExpenditures,
      editExpenditureLogs,
      editIncomeLogs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
