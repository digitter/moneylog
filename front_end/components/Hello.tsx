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
import CreateExpenditureLog from './expenditure/CreateExpenditureLog'

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
        <h2>Hello {this.props.user.name} ! This is boilerplate</h2>
        <img src ="/public/hello.png" style={{width: 200, height: 200}} />
        <Logout />
        <Cancellation />
        <AssetPage assets={this.props.assets} />
        {/* IN */}
        <CreateExpenditureLog />
        <ExpenditureLogsTable />
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
