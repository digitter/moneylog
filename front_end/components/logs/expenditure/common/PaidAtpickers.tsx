import * as React from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateExpenditureLog } from '../../../../services/ExpenditureLogService';
import ExpenditureLog from '../../../../models/ExpenditureLog';
import { actionTypes, editExpenditureLog } from '../../../../modules/ExpenditureLogModule';
import Notification, { error, success } from '../../../../models/Notification';

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
  expenditureLog: ExpenditureLog
}

export default function PaidAtPickers(props: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDateChange = event => {
    const log = Object.assign(props.expenditureLog, { paidAt: event.currentTarget.value })

    updateExpenditureLog(log)
      .then((expenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog(actionTypes.update, expenditureLog))
        Notification.successMessage(success.update)
      })
      .catch(response => {
        console.error(response)
        Notification.errorMessage(error.update)
      })
  }

  return (
    <div className={classes.container}>
      <TextField
        label="paid at"
        type="date"
        value={moment(props.expenditureLog.paidAt).format('YYYY-MM-DD')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
    </div>
  );
}
