import Axios from './Axios'
import ExpenditureLog from '../models/ExpenditureLog'

export const createExpenditureLog = (expenditureLog: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/expenditure_logs'
    const newExpenditureLog = ExpenditureLog.serialized(expenditureLog)

    Axios.post(url, newExpenditureLog)
      .then(response => {
        const newExpenditureLog = ExpenditureLog.fromJsonApi(response.data)
        resolve(newExpenditureLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const updateExpenditureLog = (log: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/expenditure_logs/${log.id}`
    const expenditureLog = ExpenditureLog.serialized(log)

    Axios.patch(url, expenditureLog)
      .then(response => {
        const updatedLog = ExpenditureLog.fromJsonApi(response.data)
        resolve(updatedLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const deleteExpenditureLog = (expenditureLog: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/expenditure_logs/${expenditureLog.id}`

    Axios.delete(url)
      .then(() => {
        resolve(expenditureLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const bulkDeleteExpenditureLogs = (expenditureLogs: ExpenditureLog[]) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/bulk_delete/expenditure_logs'
    const destroyIds: number[] = ExpenditureLog.extractIds(expenditureLogs)

    Axios.delete(url, { data: { ids: destroyIds } })
      .then(() => {
        resolve(destroyIds)
      })
      .catch(response => {
        reject(response)
      })
  })
}
