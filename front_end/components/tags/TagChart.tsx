import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import { useTypedSelector } from '../../modules/Reducers';
import ExpenditurePieChart from '../logs/expenditure/common/ExpenditurePieChart';
import IncomePieChart from '../logs/income/common/IncomePieChart';

const TagChart: React.FC = () => {
  const expenditureLogs = useTypedSelector(state => state.expenditureLogs)
  const incomeLogs = useTypedSelector(state => state.incomeLogs)

  return (
    <React.Fragment>
      <h3>Rate of this month</h3>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item>
          <ExpenditurePieChart graphID='yearlyExpenditure' logs={expenditureLogs} title="Log Rate (100 degree rotation)" />
        </Grid>
        <Grid item>
          <IncomePieChart graphID='yearlyIncome' logs={incomeLogs} title="Log Rate (100 degree rotation)" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default TagChart
