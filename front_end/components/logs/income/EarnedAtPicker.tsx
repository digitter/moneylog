import * as React from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateIncomeLog } from '../../../services/IncomeLogService';
import IncomeLog from '../../../models/IncomeLog';
import { actionTypes, editIncomeLog } from '../../../modules/IncomeLogModule';
import Notification, { success, error } from '../../../models/Notification';

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
  row: IncomeLog
}

export default function EarnedAtPickers(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleDateChange = event => {
    const log = Object.assign(props.row, { earnedAt: event.currentTarget.value })

    updateIncomeLog(log)
      .then((incomeLog: IncomeLog) => {
        dispatch(editIncomeLog(actionTypes.update, incomeLog))
        Notification.successMessage(success.update)
      })
      .catch(response => {
        console.error(response)
        Notification.errorMessage(error.update)
      })
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        label="earned at"
        type="date"
        defaultValue={moment(props.row.earnedAt).format('YYYY-MM-DD')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
    </form>
  );
}
