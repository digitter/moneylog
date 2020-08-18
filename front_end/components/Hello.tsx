import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from './auth/Logout'
import Cancellation from './auth/Cancellation'
import User from '../models/User'
import { assetParams } from '../models/Asset'
import AssetPage from './asset/AssetPage'
import ExpenditureLogsPage from '../expenditure/ExpenditureLogsPage'
import { expenditureLogParams } from '../models/ExpenditureLog'

interface HelloProps {
  user: User
  assets: assetParams[]
  expenditureLogs: expenditureLogParams[]
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
        <ExpenditureLogsPage expenditureLogs={this.props.expenditureLogs} />
        {/* IN */}
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
