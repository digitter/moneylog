import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MonthlyExpenditure from '../../models/MonthlyExpenditure'
import { editMonthlyExpenditure, actionTypes as monthlyExpenditureTypes } from '../../modules/MonthlyExpenditureModule'
import { updateMonthlyExpenditure } from '../../services/MonthlyExpenditureService'
const { useState } = React

interface Props {}

const MonthlyExpenditures: React.FC = (props: Props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(null)
  const [content, setContent] = useState('')
  const [is_active, setIsActive] = useState(null)
  const [will_create_at, setWillCreateAt] = useState(null)

  const monthlyExpenditures = useSelector(state => state.monthlyExpenditures)

  const handleMonthlySettingChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.currentTarget.name) {
      case 'title':
        setTitle(event.currentTarget.value)
        break;
      case 'amount':
        setAmount(Number(event.currentTarget.value))
        break;
      case 'content':
        setContent(event.currentTarget.value)
        break;
      case 'is-active':
        setIsActive(event.currentTarget.value)
        break;
      case 'will-create-at':
        setWillCreateAt(event.currentTarget.value)
        break;
      default: return null
    }
  }

 const handleSubmit = (event) => {
    event.preventDefault()

    updateMonthlyExpenditure({ title, amount, content, is_active, will_create_at })
      .then(jsonApiFormat => {
        dispatch(editMonthlyExpenditure(
          monthlyExpenditureTypes.update,
          MonthlyExpenditure.fromJsonApi(jsonApiFormat)
        ))
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <React.Fragment>
      <h2>Monthly Expenditure - 月間固定支出</h2>

      {monthlyExpenditures.map((expenseList: MonthlyExpenditure, index: number) => {
        return (
          <div key={index}>
            <p>{expenseList.title}</p>
            <p>{expenseList.amount}</p>
            <p>{expenseList.content}</p>
          </div>
        )
      })}

      <h2>create monthly expenditure</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='title'
          placeholder='Title'
          defaultValue ={title}
          onChange={handleMonthlySettingChange}
        />
        <input
          type='number'
          name='amount'
          placeholder='Amount'
          defaultValue ={amount}
          onChange={handleMonthlySettingChange}
        />
        <textarea
          name='content'
          placeholder='Content'
          defaultValue ={content}
          onChange={handleMonthlySettingChange}
        />
        <button type='submit'>update</button>
      </form>
    </React.Fragment>
  )
}

export default MonthlyExpenditures
