import * as React from 'react';
import * as moment from 'moment';
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
  rootContainer: {
    padding: '0px 10px',
    display: 'flex',
    flexDirection: 'column',
    height: 300,
  },
  modal: {
    width: 350,
    height: 290,
    background: '#fff',
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
    boxShadow: 'border-box',
  },
  item: {
    marginTop: '10px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  textarea: {
    minHeight: 100,
    width: 200,
  },
  editing: {
    color: 'green',
  },
}))

const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: 'none',
  }
}

Modal.setAppElement('#root')

export default function EdtingExpenditureLog(props){
  const classes = useStyles()
  const dispatch = useDispatch()
  const { useState } = React

  const [isEditing, setIsEditing] = useState(false)
  const [modalIsOpen,setIsOpen] = React.useState(false)

  const [id] = useState(props.expenditureLog.id)
  const [title, setTitle] = useState(props.expenditureLog.title)
  const [amount, setAmount] = useState(props.expenditureLog.amount)
  const [content, setContent] = useState(props.expenditureLog.content)
  const [paidAt, setPaidAt] = useState(props.expenditureLog.paidAt)

  var subtitle;

  function openModal() {
    setIsEditing(true)
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(){
    setIsEditing(false)
    setIsOpen(false)
  }

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
      case 'paidAt':
        setPaidAt(event.currentTarget.value)
        break;
      default: return null
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateExpenditureLog({ id, title, amount, content, paidAt })
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
            {isEditing
              ? <EditIcon className={classes.editing} />
              : <EditIcon/>}
          </IconButton>
        </Tooltip>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className={classes.modal}
        >
          <div
            ref={_subtitle => (subtitle = _subtitle)}
            className={classes.header}
            style={{paddingLeft: 20}}
          >
            Edit expenditure log
          </div>

          <form onSubmit={handleSubmit} className={classes.rootContainer}>
            <Grid container spacing={1} justify="flex-start">
              <Grid item className={classes.item}>
                <TextField
                  name='title'
                  placeholder='Title'
                  defaultValue ={title}
                  onChange={handleExpenditureLogChange}
                />
              </Grid>
              <Grid item className={classes.item}>
                <TextField
                  type='number'
                  name='amount'
                  placeholder='Amount'
                  defaultValue ={amount}
                  onChange={handleExpenditureLogChange}
                />
              </Grid>
              <Grid item className={classes.item}>
                <TextareaAutosize
                  name='content'
                  rowsMax={5}
                  aria-label="maximum height"
                  placeholder='Content'
                  defaultValue ={content}
                  onChange={handleExpenditureLogChange}
                  className={classes.textarea}
                />
              </Grid>
              {/* <Grid item className={classes.item}>
                <TextField
                  name="paidAt"
                  label="paid at"
                  type="date"
                  defaultValue={moment(props.expenditureLog.paidAt).format('YYYY-MM-DD')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleExpenditureLogChange}
                />
              </Grid> */}
            </Grid>

            <Grid container spacing={2} justify="flex-start">
              <Grid item className={classes.item}>
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
              <Grid item className={classes.item}>
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
        </Modal>
      </React.Fragment>
    )
}
