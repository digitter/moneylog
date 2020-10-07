import * as React from 'react';
import * as moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateMonthlyExpenditure } from '../../services/MonthlyExpenditureService';
import MonthlyExpenditure from '../../models/MonthlyExpenditure';
import { succesmMessages, successMessage } from '../../GlobalMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

interface Props {
  row: MonthlyExpenditure
}

export default function DatePickers(props: Props) {
  const classes = useStyles();

  const handleDateChange = event => {
    const newMonthlyData = Object.assign(props.row, { will_create_at: event.currentTarget.value })

    updateMonthlyExpenditure(newMonthlyData)
      .then(jsonApiFormat => {
        successMessage(succesmMessages.update)
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        label="ログ作成日"
        type="date"
        defaultValue={moment(props.row.willCreateAt).format('YYYY-MM-DD')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
    </form>
  );
}
