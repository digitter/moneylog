import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import Chart from '../logs/chart/chart';

const circle = {
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  background: '#547599',
  margin: 15
}

const TagChart: React.FC = () => {
  return (
    <React.Fragment>
      <h3>Rate of this month</h3>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item>
          <Chart/>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Expenditure Rate</h3>
        </Grid>
        <Grid item>
          <Chart/>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Income Rate</h3>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default TagChart
