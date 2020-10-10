import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import Hello from './components/Hello'
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import GlobalMessage from './components/GlobalMessage'
import Header from './components/Header'
import ExpenditureLogsTable from './components/expenditure/ExpenditureLogsTable'
import IncomeLogsTable from './components/income/IncomeLogsTable'
import MonthlyExpenditureTable from './components/monthly/MonthlyExpendiitureTable'
import AssetPage from './components/asset/AssetPage'

interface Props {
  history: any
}
interface State {
}

class Routing extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <GlobalMessage />

        <Switch>
          <Route exact path='/signup' component={Registration} />
          <Route exact path='/signin' component={Login} />

          <Auth history={this.props.history}>
            <Header />
            <Switch>
              <Route exact path="/" component={Hello} />

              <Route path='/asset' component={AssetPage} />
              <Redirect from='asset/:any' to='/asset' />

              <Route path='/expenditure_logs' component={ExpenditureLogsTable} />
              <Route path='expenditure_logs/:id' component={Hello} />

              <Route path='/income_logs' component={IncomeLogsTable} />
              <Route path='income_logs/:id' component={Hello} />

              <Route path='/monthly_expenditures' component={MonthlyExpenditureTable} />

              <Route path="*" render={() => <h1>No contents</h1>} />
            </Switch>
          </Auth>

          <Redirect to='/' />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
