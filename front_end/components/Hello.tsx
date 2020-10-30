import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ExpenditureLogsTable from './logs/expenditure/ExpenditureLogsTable'
import IncomeLogsTable from './logs/income/IncomeLogsTable'

interface HelloProps {}
interface HelloState {}

class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    return (
      <React.Fragment>
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
