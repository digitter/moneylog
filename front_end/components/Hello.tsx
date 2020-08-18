import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from './auth/Logout'
import Cancellation from './auth/Cancellation'
import User from '../models/User'
import Asset from '../models/Asset'
import AssetPage from './asset/AssetPage'
import ExpenditureLogsPage from '../expenditure/ExpenditureLogsPage'

interface HelloProps {
  user: User
  asset: Asset
  expenditureLogs: any
}

interface HelloState {
}

class Hello extends React.Component<HelloProps, HelloState> {

  render() {
    const asset = this.props.asset
    const expenditureLogs = this.props.expenditureLogs

    return (
      <React.Fragment>
        <h2>Hello {this.props.user.name} ! This is boilerplate</h2>
        <img src ="/public/hello.png" style={{width: 200, height: 200}} />
        <Logout />
        <Cancellation />
        <AssetPage asset={asset} />
        <ExpenditureLogsPage expenditureLogs={expenditureLogs} />
        {/* IN */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    asset: state.assets,
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
