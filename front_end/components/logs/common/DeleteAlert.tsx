import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton';
import IncomeLog from '../../../models/IncomeLog';
import ExpenditureLog from '../../../models/ExpenditureLog';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  row: IncomeLog | ExpenditureLog
  handleDeleteClick: (row: IncomeLog | ExpenditureLog) => void
}

const DeleteAlert: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDisagree = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    props.handleDeleteClick(props.row)
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Delete log">
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete ?"}
          <br />
          {"本当に削除しますか ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, log can't be recovered.
            <br />
            {props.row.title} のログデータを削除します。
            <br />
            削除すると復元できませんがよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree・いいえ
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree・はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAlert
