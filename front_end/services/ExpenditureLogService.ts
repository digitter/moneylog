import Axios from './Axios'
import ExpenditureLog from '../models/ExpenditureLog'
import Store from '../modules/store'

export const updateExpenditureLog = (params: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/expenditure_logs/${params.id}`
    const newExpenditure_log = ExpenditureLog.serialized(params)

    Axios.patch(url, newExpenditure_log)
      .then(response => {
        const updatedLog = ExpenditureLog.fromJsonApi(response.data)

        let { expenditureLogs } = Store.getState()

        expenditureLogs = expenditureLogs.map((log: ExpenditureLog) => {
          if (log.id == updatedLog.id) return updatedLog;
          return log;
        })

        resolve(expenditureLogs)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const createExpenditureLog = (params: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/expenditure_logs'
    const newExpenditure_log = ExpenditureLog.serialized(params)

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
      .then(() => {
        const { expenditureLogs } = Store.getState()
        const newExpenditureLogs = expenditureLogs.filter((log: ExpenditureLog) => log.id !== params.id)

        resolve(newExpenditureLogs)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const bulkDeleteExpenditureLogs = (params: ExpenditureLog[]) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/bulk_delete/expenditure_logs'
    const destroyIds: number[] = ExpenditureLog.extractIds(params)

    Axios.delete(url, { data: { ids: destroyIds } })
      .then(() => {
        const { expenditureLogs } = Store.getState()
        const newExpenditureLogs = expenditureLogs.filter((log: ExpenditureLog) => !destroyIds.includes(log.id))
        resolve(newExpenditureLogs)
      })
      .catch(response => {
        reject(response)
      })
  })
}
