import * as React from 'react';
import { useDispatch } from 'react-redux'
import IncomeLog from '../../../models/IncomeLog';
import clsx from 'clsx';
import { bulkDeleteIncomeLogs } from '../../../services/IncomeLogService';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { setLoadingMessage } from '../../../modules/CommonModule';
import Notification, { progress, success, error } from '../../../models/Notification';
import { editIncomeLogs, actionTypes } from '../../../modules/IncomeLogModule';
import CreateIncomeLogModal from './CreateIncomeLogModal';
import BulkDeleteAlert from '../common/BulkDeleteAlert';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 360,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  incomeLogs: IncomeLog[];
  setCheckedLogs: any;
}

const IncomeTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const dispatch = useDispatch();
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const handleBulkDeleteClick = (logs: IncomeLog[]) => {
    if (!window.confirm('Are you sure ?')) return

    dispatch(setLoadingMessage(progress.bulkDestroy))

    bulkDeleteIncomeLogs(logs)
      .then((deleteIds: number[]) => {
        dispatch(editIncomeLogs(actionTypes.bulkDestroy, deleteIds))
        props.setCheckedLogs([])
        Notification.successMessage(success.bulkDestroy)
        dispatch(setLoadingMessage(null))
      })
      .catch(response => {
        console.error(response)
        Notification.errorMessage(error.bulkDestroy)
        dispatch(setLoadingMessage(null))
      })
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          0 selected
        </Typography>
      )}
      {numSelected > 0 ? (
        <BulkDeleteAlert logs={props.incomeLogs} handleDeleteClick={handleBulkDeleteClick} />
      ) : (
        <>
          <CreateIncomeLogModal />
          <CreateIncomeLogModal />
          <CreateIncomeLogModal />
        </>
      )}
    </Toolbar>
  );
};

export default IncomeTableToolbar
