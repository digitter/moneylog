import Axios from './Axios'
import MonthlyExpenditure from '../models/MonthlyExpenditure'

export const updateMonthlyExpenditure = (params: MonthlyExpenditure) => {
  return new Promise((resolve, reject) => {
    const url = `/api/v1/monthly_expenditures/${params.id}`
    const monthlyExpenditure = MonthlyExpenditure.serialized(params)

    Axios.patch(url, monthlyExpenditure)
      .then(response => {
        const updatedMonthlyExpenditure = MonthlyExpenditure.fromJsonApi(response.data)
        resolve(updatedMonthlyExpenditure)
      })
      .catch(response => {
        reject(response)
      })
  })
}
