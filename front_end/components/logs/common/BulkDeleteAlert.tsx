import * as React from 'react'
import ExpenditureLog from 'front_end/models/ExpenditureLog'
import IncomeLog from 'front_end/models/IncomeLog'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  logs: ExpenditureLog[] | IncomeLog[]
  handleDeleteClick: (logs: IncomeLog[] | ExpenditureLog[]) => void
}

const BulkDeleteAlert: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDisagree = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    props.handleDeleteClick(props.logs)
    setOpen(false);
  };
  return (
    <React.Fragment>
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
            Once deleted, logs can't be recovered.
            <br />
            ログを一括削除します。
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
    </React.Fragment>
  )
}

export default BulkDeleteAlert
