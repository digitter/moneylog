import * as React from 'react'
import { useDispatch } from 'react-redux'
import { createExpenditureLog } from '../../../services/ExpenditureLogService'
import ExpenditureLog from '../../../models/ExpenditureLog'
import { editExpenditureLog, actionTypes as expenditureActionTypes } from '../../../modules/ExpenditureLogModule'
import { successMessage, succesmMessages, errorMessage, errorMessages } from '../../GlobalMessage'

const { useState } = React

const CreateExpenditureLogModal: React.FC = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(null)
  const [amount, setAmount] = useState(null)
  const [content, setContent] = useState(null)

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

    createExpenditureLog({ title, amount, content })
      .then((newExpenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog(expenditureActionTypes.create, newExpenditureLog))
        successMessage(succesmMessages.create)
      })
      .catch(response => {
        console.error(response)
        successMessage(errorMessages.create)
      })
  }

  return (
    <React.Fragment>
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

        <button type='submit'>Create!</button>
      </form>
    </React.Fragment>
  )
}

export default CreateExpenditureLogModal
