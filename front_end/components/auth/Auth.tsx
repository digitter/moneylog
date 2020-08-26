import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { fetchUser } from '../../services/UserService'
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editExpenditureLogs } from '../../modules/ExpenditureLogModule'
import User from '../../models/User'

import LoadingIcon from '../LoadingIcon'
import ExpenditureLog from '../../models/ExpenditureLog'
import Asset from '../../models/Asset'
import Top from '../Top'

interface Props {
  history: any
  user: User
  asset: Asset
  expenditureLogs: any
  editUser: typeof editUser
  editAssets: typeof editAssets
  editExpenditureLogs: typeof editExpenditureLogs
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
      .then(jsonApiFormat => {
        if (jsonApiFormat.data.type === 'user') {
          this.props.editUser(jsonApiFormat.data.attributes)
          this.props.editAssets(Asset.fromIncluded(jsonApiFormat))
          this.props.editExpenditureLogs<ExpenditureLog[]>('INITIALIZE', ExpenditureLog.fromIncluded(jsonApiFormat))
          this.setState({ loggedInStatus: 'LOGGED_IN' })
        }
        else {
          this.props.editUser(null)
          this.props.editAssets(null)
          this.props.editExpenditureLogs<null>('RESET', null)
          this.setState({ loggedInStatus: 'NOT_LOGGED_IN' })
        }
      })
      .catch(error => {
        this.props.editUser(null)
        this.props.editAssets(null)
        this.props.editExpenditureLogs<null>('RESET', null)
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN'})

        console.error('check login error', error)
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
      editExpenditureLogs: editExpenditureLogs
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
