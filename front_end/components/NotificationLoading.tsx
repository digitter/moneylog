import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useTypedSelector } from '../modules/Reducers'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid gray',
    },
    paper: {
      // backgroundColor: theme.palette.background.paper,
      background: '#edf3ff',
      width: 250,
      borderRadius: 5,
    },
    msg: {
      fontSize: 13,
      width: '90%',
      margin: '0 auto',
      textAlign: 'center',
    }
  }),
);

const NotificationLoading: React.FC = () => {
  const loadingMsg = useTypedSelector(state => state.common.loadingMsg)
  const classes = useStyles();

  return (
    <React.Fragment>
        {loadingMsg ?
          <div>
            <Modal
              open={true}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
            >
              <div className={classes.paper}>
                <Grid className={classes.paper} container direction="column">
                  <Grid item>
                    <img src ="/public/loadingp.gif" />
                  </Grid>
                  <Grid item>
                    <div className={classes.msg}>
                      {loadingMsg}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Modal>
          </div>
        : null}
    </React.Fragment>
  )
}

export default NotificationLoading
