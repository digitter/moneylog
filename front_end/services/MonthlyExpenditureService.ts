import Axios from './Axios'
import MonthlyExpenditure from '../models/MonthlyExpenditure'

export const updateMonthlyExpenditure = (params: MonthlyExpenditure) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/monthly_expenditures/${params.id}`

    Axios.patch(url, params)
      .then(response => {
        const updatedMonthlyExpenditure = MonthlyExpenditure.fromJsonApi(response.data)
        resolve(updatedMonthlyExpenditure)
      })
      .catch(response => {
        reject(response)
      })
  })
}
