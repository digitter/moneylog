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
      <h3>Rate of this month</h3>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item>
          <div style={circle}>1</div>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Expenditure Rate</h3>
          <div style={circle}>2</div>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Income Rate</h3>
        </Grid>
        <Grid item>
          <div style={circle}>3</div>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Fixed Expenditure Rate</h3>
          <div style={circle}>4</div>
          <h3 style={{fontWeight: 100, display: 'inline-block'}}>Total Rate</h3>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default TagChart
