import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from './auth/Logout'
import Cancellation from './auth/Cancellation'
import User from '../models/User'
import Asset from '../models/Asset'
import AssetPage from './asset/AssetPage'
import ExpenditureLog from '../models/ExpenditureLog'
import ExpenditureLogsTable from './expenditure/ExpenditureLogsTable'
import CreateExpenditureLogModal from './expenditure/CreateExpenditureLogModal'
import CreateIncomeLogModal from './income/CreateIncomeLogModal'
import IncomeLogsTable from './income/IncomeLogsTable'
import MonthlyExpenditureTable from './monthly/MonthlyExpendiitureTable'

interface HelloProps {
  user: User
  assets: Asset[]
  expenditureLogs: ExpenditureLog[]
}

interface HelloState {
}

class Hello extends React.Component<HelloProps, HelloState> {

  render() {
    return (
      <React.Fragment>
        <Cancellation />

        <AssetPage assets={this.props.assets} />
        <MonthlyExpenditureTable />

        <CreateIncomeLogModal/>
        <IncomeLogsTable/>

        <CreateExpenditureLogModal/>
        <ExpenditureLogsTable/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    assets: state.assets,
    expenditureLogs: state.expenditureLogs
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
