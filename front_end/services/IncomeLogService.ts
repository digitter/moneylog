import Axios from './Axios'
import IncomeLog from '../models/IncomeLog'

export const createIncomeLog = (incomeLog: IncomeLog) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/income_logs'
    const newIncomeLog = IncomeLog.serialized(incomeLog)

    Axios.post(url, newIncomeLog)
      .then(response => {
        const newIncomeLog = IncomeLog.fromJsonApi(response.data)
        resolve(newIncomeLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const updateIncomeLog = (incomeLog: IncomeLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/income_logs/${incomeLog.id}`
    const updatedIncomeLog = IncomeLog.serialized(incomeLog)

    Axios.patch(url, updatedIncomeLog)
      .then(response => {
        const updatedLog = IncomeLog.fromJsonApi(response.data)
        resolve(updatedLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const deleteIncomeLog = (incomeLog: IncomeLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/income_logs/${incomeLog.id}`

    Axios.delete(url)
      .then(() => {
        resolve(incomeLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const bulkDeleteIncomeLogs = (incomeLogs: IncomeLog[]) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/bulk_delete/income_logs'
    const destroyIds: number[] = IncomeLog.extractIds(incomeLogs)

    Axios.delete(url, { data: { ids: destroyIds } })
      .then(() => {
        resolve(destroyIds)
      })
      .catch(response => {
        reject(response)
      })
  })
}
