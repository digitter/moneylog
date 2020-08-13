import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from './auth/Logout'
import Cancellation from './auth/Cancellation'
import User from '../models/User'
import Asset from './asset/Asset'

interface HelloProps {
  user: User
  assets: any
}

interface HelloState {
}

class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    const asset = this.props.assets.assets ? this.props.assets.assets[0].attributes : null

    return (
      <React.Fragment>
        <h2>Hello boilerplate</h2>
        {asset ? <Asset asset={asset} /> : null}

        {/* {asset
          ? <h2>My Asset</h2>
          : null
        }
        {asset
          ? <h3>{asset.title}</h3>
          : null
        }
        {asset
          ? <div>{asset.content}: <strong>{asset.amount}</strong></div>
          : null
        } */}

        <img src ="/public/hello.png" style={{width: 200, height: 200}} />
        <Logout />
        <Cancellation />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
    assets: state.assets
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
