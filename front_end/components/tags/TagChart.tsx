import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import PieChart from '../logs/chart/chart';

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
          <PieChart title="Log Rate (100 degree rotation)" />
        </Grid>
        <Grid item>
          <PieChart title="Log Rate (100 degree rotation)" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default TagChart
