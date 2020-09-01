import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { fetchUser } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editExpenditureLogs, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule'
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'
import User from '../../models/User'

import LoadingIcon from '../LoadingIcon'
import ExpenditureLog from '../../models/ExpenditureLog'
import Asset from '../../models/Asset'
import Top from '../Top'
import IncomeLog from '../../models/IncomeLog'

interface Props {
  history: any
  user: User
  asset: Asset
  expenditureLogs: ExpenditureLog[]
  incomeLogs: IncomeLog[]
  editUser: typeof editUser
  editAssets: typeof editAssets
  editExpenditureLogs: typeof editExpenditureLogs
  editIncomeLogs: typeof editIncomeLogs
}
interface State {
  loggedInStatus: string
}

class Auth extends React.Component<Props, State> {
  state = {
    loggedInStatus: 'LOGGED_IN'
  }

  componentDidMount() {
    fetchUser()
      .then((jsonApiFormat: any) => {
        if (jsonApiFormat.data && jsonApiFormat.data.type === 'user') {
          this.props.editUser(jsonApiFormat.data.attributes)
          this.props.editAssets(Asset.fromIncluded(jsonApiFormat))
          this.props.editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat))
          this.props.editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat))

          this.setState({ loggedInStatus: 'LOGGED_IN' })
        }
        else {
          this.props.editUser({})
          this.props.editAssets([])
          this.props.editExpenditureLogs(expenditureActionTypes.reset, [])
          this.props.editIncomeLogs(incomeActionTypes.reset, [])
          this.setState({ loggedInStatus: 'NOT_LOGGED_IN' })
        }
      })
      .catch(error => {
        this.props.editUser({})
        this.props.editAssets([])
        this.props.editExpenditureLogs(expenditureActionTypes.reset, [])
        this.props.editIncomeLogs(incomeActionTypes.reset, [])
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN'})

        console.error(error)
      })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedInStatus === 'LOGGED_IN' ?
            Object.keys(this.props.user).length
              ? this.props.children
              : <LoadingIcon />
          : <Top history={this.props.history} />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
