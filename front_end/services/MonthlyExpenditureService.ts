import Axios from './Axios'
import MonthlyExpenditure from '../models/MonthlyExpenditure'
import apiEndPoint from 'apiEndPoint'

export const updateMonthlyExpenditure = (setting: MonthlyExpenditure) => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/monthly_expenditures/${setting.id}`
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
