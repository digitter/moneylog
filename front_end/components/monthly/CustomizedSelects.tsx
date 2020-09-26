import * as React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import MonthlyExpenditure from '../../models/MonthlyExpenditure';
import { updateMonthlyExpenditure } from '../../services/MonthlyExpenditureService';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
)

interface Props {
  row: MonthlyExpenditure
}

export default function CustomizedSelects(props: Props) {
  const classes = useStyles()
  const [isValid, setIsValid] = React.useState(props.row.isActive ? 1 : 0)

  const handleChange = event => {
    if (event.currentTarget.value === isValid) { return null }

    setIsValid(event.currentTarget.value)

    const newMonthlyData = Object.assign(props.row, { is_active: event.currentTarget.value })

    updateMonthlyExpenditure(newMonthlyData)
      .then(jsonApiFormat => {
        console.log(jsonApiFormat)
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <React.Fragment>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">ログ作成</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={isValid}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value={1}>有効</option>
          <option value={0}>無効</option>
        </NativeSelect>
      </FormControl>
    </React.Fragment>
  )
}
