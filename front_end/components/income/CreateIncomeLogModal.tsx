import * as React from 'react'
import { useDispatch } from 'react-redux'
import { createIncomeLog } from '../../services/IncomeLogService'
import IncomeLog from '../../models/IncomeLog'
import { editIncomeLog, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'

const { useState } = React

interface Props {
}

const CreateIncomeLogModal: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(null)
  const [amount, setAmount] = useState(null)
  const [content, setContent] = useState(null)

  const handleIncomeLogChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    createIncomeLog({ title, amount, content })
      .then((newIncomeLog: IncomeLog) => {
        dispatch(editIncomeLog(incomeActionTypes.create, newIncomeLog))
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <React.Fragment>
      <h2>Create IncomeLog</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='title'
            placeholder='Title'
            defaultValue ={title}
            onChange={handleIncomeLogChange}
          />

          <input
            type='number'
            name='amount'
            placeholder='Amount'
            defaultValue ={amount}
            onChange={handleIncomeLogChange}
          />

          <textarea
            name='content'
            placeholder='Content'
            defaultValue ={content}
            onChange={handleIncomeLogChange}
          />

          <button type='submit'>Create!</button>
        </form>
    </React.Fragment>
  )
}

export default CreateIncomeLogModal
