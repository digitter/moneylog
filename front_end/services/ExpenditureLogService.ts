import Axios from './Axios'
import ExpenditureLog from '../models/ExpenditureLog'

export const updateExpenditureLog = (params: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/expenditure_logs/${params.id}`
    const newExpenditure_log = ExpenditureLog.newInstance(params)

    Axios.patch(url, newExpenditure_log)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const createExpenditureLog = (params: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/expenditure_logs'
    const newExpenditure_log = ExpenditureLog.newInstance(params)

    Axios.post(url, newExpenditure_log)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const deleteExpenditureLog = (params: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/expenditure_logs/${params.id}`

    Axios.delete(url)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}
