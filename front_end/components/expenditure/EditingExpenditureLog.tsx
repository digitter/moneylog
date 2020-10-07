import * as React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { updateExpenditureLog } from '../../services/ExpenditureLogService'

import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpenditureLog from '../../models/ExpenditureLog';
import { editExpenditureLog, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule'
import { successMessage, succesmMessages, errorMessage, errorMessages } from '../../GlobalMessage';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

export default function EdtingExpenditureLog(props){
  const dispatch = useDispatch();

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
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
        <Tooltip title="Update">
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

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>

          <form onSubmit={handleSubmit}>
            <input
              name='title'
              placeholder='Title'
              defaultValue ={title}
              onChange={handleExpenditureLogChange}
            />

            <input
              type='number'
              name='amount'
              placeholder='Amount'
              defaultValue ={amount}
              onChange={handleExpenditureLogChange}
            />

            <textarea
              name='content'
              placeholder='Content'
              defaultValue ={content}
              onChange={handleExpenditureLogChange}
            />

            <button type='submit'>update</button>
            <button onClick={closeModal}>close</button>
          </form>
        </Modal>
      </React.Fragment>
    )
}
