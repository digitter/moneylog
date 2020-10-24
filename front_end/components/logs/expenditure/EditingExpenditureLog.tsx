import * as React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { updateExpenditureLog } from '../../../services/ExpenditureLogService'

import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpenditureLog from '../../../models/ExpenditureLog';
import { editExpenditureLog, actionTypes as expenditureActionTypes } from '../../../modules/ExpenditureLogModule'
import { successMessage, succesmMessages, errorMessage, errorMessages } from '../../GlobalMessage';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    width: '100%',
    background: '#263238',
    color: 'white',
  },
}))

const customStyles = {
  content : {
    width: 350,
    height: 300,
    background: '#fff',
    backgroundColor: '#fff',
    padding: 0,
    marginTop: 50,
    position: 'absolute',
    top: '40px',
    left: 'none',
    right: '10px',
    bottom: '40px',
    border: '1px solid rgb(204, 204, 204)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
  },
  overlay: {zIndex: 1000}
};

Modal.setAppElement('#root')

export default function EdtingExpenditureLog(props){
  const classes = useStyles();
  const dispatch = useDispatch();

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(){
    setIsOpen(false);
  }

  const [id] = React.useState(props.expenditureLog.id);
  const [title, setTitle] = React.useState(props.expenditureLog.title);
  const [amount, setAmount] = React.useState(props.expenditureLog.amount);
  const [content, setContent] = React.useState(props.expenditureLog.content);

  const handleExpenditureLogChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.currentTarget.name) {
      case 'title':
        setTitle(event.currentTarget.value)
        break;
      case 'amount':
        setAmount(event.currentTarget.value)
        break;
      case 'content':
        setContent(event.currentTarget.value)
        break;
      default: return null
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateExpenditureLog({ id, title, amount, content })
      .then((expenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog(expenditureActionTypes.update, expenditureLog))
        successMessage(succesmMessages.update)
      })
      .catch(response => {
        console.error(response)
        errorMessage(errorMessages.update)
      })
  }

    return (
      <React.Fragment>
        <Tooltip title="Edit log">
          <IconButton aria-label="update" onClick={openModal} >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            ref={_subtitle => (subtitle = _subtitle)}
            className={classes.header}
            style={{paddingLeft: 20}}
          >
            Edit expenditure log
          </div>

          <div style={{padding: '0px 10px'}}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item></Grid>
                <Grid item>
                  <TextField
                    name='title'
                    placeholder='Title'
                    defaultValue ={title}
                    onChange={handleExpenditureLogChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type='number'
                    name='amount'
                    placeholder='Amount'
                    defaultValue ={amount}
                    onChange={handleExpenditureLogChange}
                  />
                </Grid>
                <Grid item>
                  <TextareaAutosize
                    name='content'
                    rowsMax={5}
                    aria-label="maximum height"
                    placeholder='Content'
                    defaultValue ={content}
                    onChange={handleExpenditureLogChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} justify="flex-start">
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    style={{width: 60, background: '#0F7C3F', color: 'white', fontSize: 10}}
                  >
                    EDIT
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="inherit"
                    onClick={closeModal}
                    style={{width: 60, background: '#545458', color: 'white', fontSize: 10}}
                  >
                    CLOSE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      </React.Fragment>
    )
}
