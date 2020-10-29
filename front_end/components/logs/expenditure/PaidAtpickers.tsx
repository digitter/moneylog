import * as React from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { succesmMessages, successMessage } from '../../GlobalMessage';
import { updateExpenditureLog } from '../../../services/ExpenditureLogService';
import ExpenditureLog from '../../../models/ExpenditureLog';
import { actionTypes, editExpenditureLog } from '../../../modules/ExpenditureLogModule';

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
  row: ExpenditureLog
}
export default function PaidAtPickers(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleDateChange = event => {
    const log = Object.assign(props.row, { paidAt: event.currentTarget.value })

    updateExpenditureLog(log)
      .then((expenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog(actionTypes.update, expenditureLog))
        successMessage(succesmMessages.update)
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        label="支払日"
        type="date"
        defaultValue={moment(props.row.paidAt).format('YYYY-MM-DD')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
    </form>
  );
}
