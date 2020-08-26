import * as React from 'react'
import { createExpenditureLog } from '../../services/ExpenditureLogService'
const { useState } = React

interface Props {
}

const CreateExpenditureLog = (props: Props) => {
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
  }

  return (
    <React.Fragment>
      <h2>Create ExpenditureLog</h2>
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

export default CreateExpenditureLog
