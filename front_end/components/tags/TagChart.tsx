import * as React from 'react'
import Grid from '@material-ui/core/Grid';

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
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item>
          <div style={circle}>1</div>
          <div>Expenditure Rate</div>
          <div style={circle}>2</div>
          <div>Income Rate</div>
        </Grid>
        <Grid item>
          <div style={circle}>3</div>
          <div>Fixed Expenditure Rate</div>
          <div style={circle}>4</div>
          <div>Total Rate</div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default TagChart
