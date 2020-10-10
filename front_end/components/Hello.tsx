import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cancellation from './auth/Cancellation'
import AssetPage from './asset/AssetPage'
import ExpenditureLogsTable from './expenditure/ExpenditureLogsTable'
import IncomeLogsTable from './income/IncomeLogsTable'
import MonthlyExpenditureTable from './monthly/MonthlyExpendiitureTable'

interface HelloProps {}

interface HelloState {}

class Hello extends React.Component<HelloProps, HelloState> {

  render() {
    return (
      <React.Fragment>
        <Cancellation />

        <AssetPage />
        <MonthlyExpenditureTable />

        <IncomeLogsTable/>

        <ExpenditureLogsTable/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
