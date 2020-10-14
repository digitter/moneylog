import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { fetchUser } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editExpenditureLogs, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule'
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'
import { editMonthlyExpenditures, actionTypes as monthlyExpenditureTypes } from '../../modules/MonthlyExpenditureModule'
import { editTags, actionTypes as tagTypes } from '../../modules/TagModule'

import User from '../../models/User'
import Asset from '../../models/Asset'
import ExpenditureLog from '../../models/ExpenditureLog'
import IncomeLog from '../../models/IncomeLog'
import MonthlyExpenditure from '../../models/MonthlyExpenditure'
import Tag from '../../models/Tag'

import LoadingIcon from '../LoadingIcon'
import Top from '../Top'

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
  editMonthlyExpenditures: typeof editMonthlyExpenditures
  editTags: typeof editTags
}
interface State {
  loggedInStatus: string
}

class Auth extends React.Component<Props, State> {
  state = {
    loggedInStatus: 'LOGGED_IN'
  }

  componentDidMount() {
    if (!Object.keys(this.props.user).length) {
      fetchUser()
        .then((jsonApiFormat: any) => {
          if (jsonApiFormat.data && jsonApiFormat.data.type === 'user') {
            this.props.editUser(jsonApiFormat.data.attributes)
            this.props.editAssets(Asset.fromIncluded(jsonApiFormat))
            this.props.editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat))
            this.props.editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat))
            this.props.editMonthlyExpenditures(monthlyExpenditureTypes.initialize, MonthlyExpenditure.fromIncluded(jsonApiFormat))
            this.props.editTags(tagTypes.initialize, Tag.fromIncluded(jsonApiFormat))

            this.setState({ loggedInStatus: 'LOGGED_IN' })
          }
          else {
            this.props.editUser({})
            this.props.editAssets([])
            this.props.editExpenditureLogs(expenditureActionTypes.reset, [])
            this.props.editIncomeLogs(incomeActionTypes.reset, [])
            this.props.editMonthlyExpenditures(monthlyExpenditureTypes.reset, [])
            this.props.editTags(tagTypes.reset, [])

            this.setState({ loggedInStatus: 'NOT_LOGGED_IN' })
          }
        })
        .catch(error => {
          this.props.editUser({})
          this.props.editAssets([])
          this.props.editExpenditureLogs(expenditureActionTypes.reset, [])
          this.props.editIncomeLogs(incomeActionTypes.reset, [])
          this.props.editMonthlyExpenditures(monthlyExpenditureTypes.reset, [])
          this.props.editTags(tagTypes.reset, [])

          this.setState({ loggedInStatus: 'NOT_LOGGED_IN' })
          console.error(error)
        })
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedInStatus === 'LOGGED_IN'
            ?
              Object.keys(this.props.user).length
                ? this.props.children
                : <LoadingIcon />
            :
              <Switch>
                <Route exact path='/' component={Top} />
                <Redirect from='*' to='/' />
              </Switch>
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
      editUser,
      editAssets,
      editExpenditureLogs,
      editIncomeLogs,
      editMonthlyExpenditures,
      editTags
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
