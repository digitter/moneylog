import * as React from 'react'
import { useDispatch } from 'react-redux'
import { createIncomeLog } from '../../../services/IncomeLogService'
import IncomeLog from '../../../models/IncomeLog'
import { editIncomeLog, actionTypes as incomeActionTypes } from '../../../modules/IncomeLogModule'
import { succesmMessages, successMessage, errorMessage, errorMessages } from '../../GlobalMessage'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from 'react-hook-form'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formItem: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.down('sm')]: {
        width: 300,
      }
    },
    contentsTitle: {
      background: '#263238',
      color: 'white',
      textAlign: 'center',
      letterSpacing: 2,
      borderRadius: 2,
      display: 'inline-block',
      padding: 5,
      margin: '20px 20px',
      fontWeight:  10,
      borderLeft: '5px solid #818ed3',
      borderRight: '5px solid #818ed3',
      fontSize: 10,
    },
    createButton: {
      width: 60,
      margin: theme.spacing(0.5),
      background: '#547599',
      color: 'white',
      fontSize: 10,
    },
    closeButton: {
      width: 60,
      margin: theme.spacing(0.5),
      background: '#525355',
      color: 'white',
      fontSize: 10,
    },
  }),
);

type Inputs = {
  title: string,
  amount: number,
  content: string
}

interface Props {
}

const CreateIncomeLogModal: React.FC<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { handleSubmit, register, reset } = useForm<Inputs>()

  const onSubmit = (log: IncomeLog) => {
    event.preventDefault()

    createIncomeLog(log)
      .then((newIncomeLog: IncomeLog) => {
        dispatch(editIncomeLog(incomeActionTypes.create, newIncomeLog))
        reset()
        successMessage(succesmMessages.create)
      })
      .catch(response => {
        errorMessage(errorMessages.create)
        console.error(response)
      })
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="inherit"
          style={{width: 60, background: '#547599', color: 'white', fontSize: 10, margin: 10}}
          onClick={handleOpen}
        >
          NEW
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h3 id="transition-modal-title" className={classes.contentsTitle}>Create Income Log</h3>

              <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid className={classes.formItem} container justify='center'>
                  <Grid item>
                    <TextField fullWidth type="text" id="filled-basic" label="Title" variant="filled" name="title" inputRef={register} />
                  </Grid>
                  <Grid item>
                    <TextField fullWidth type="number" id="outlined-basic" label="Amount" variant="outlined" name="amount" inputRef={register} />
                  </Grid>
                  <Grid item>
                    <TextField fullWidth type="text" id="outlined-basic" label="Content" variant="outlined" name="content" inputRef={register} />
                  </Grid>
                </Grid>

                <Grid container justify='center'>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="inherit"
                      className={classes.createButton}
                    >
                      CREATE
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="contained"
                      color="inherit"
                      onClick={handleClose}
                      className={classes.closeButton}
                    >
                      CLOSE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
    </React.Fragment>
  )
}

export default CreateIncomeLogModal
