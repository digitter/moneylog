import Axios from './Axios'
import MonthlyExpenditure from '../models/MonthlyExpenditure'

export const updateMonthlyExpenditure = (setting: MonthlyExpenditure) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/monthly_expenditures/${setting.id}`
    const monthlyExpenditure = MonthlyExpenditure.serialized(setting)

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
