import IncomeLog from "../models/IncomeLog"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE_INCOME_LOGS',
  reset: 'RESET_INCOME_LOG',
  create: 'CREATE_INCOME_LOG',
  update: 'UPDATE_INCOME_LOG',
  destroy: 'DESTROY_INCOME_LOG',
  bulkDestroy: 'BULK_DESTROY_INCOME_LOGS'
}

// Action Creators
export function editIncomeLogs(type: string, params: IncomeLog[] | number[]) {
  return async (dispatch, getState) => {
    const existingLogs = await getState().incomeLogs

    return dispatch(
      {
        type: type,
        payload: { existingLogs, params }
      }
    )
  }
}

export function editIncomeLog(type: string, params: IncomeLog) {
  return async (dispatch, getState) => {
    const existingLogs = await getState().incomeLogs

    return dispatch(
      {
        type: type,
        payload: { existingLogs, params }
      }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any }

export default function IncomeLogsReducer(state = [], action: fluxAction) {
  switch (action.type) {
    case actionTypes.initialize:
      return action.payload.params
    case actionTypes.reset:
      return null
    case actionTypes.create:
      return [action.payload.params, ...action.payload.existingLogs]
    case actionTypes.update:
      return action.payload.existingLogs.map((log: IncomeLog) => {
        if (log.id == action.payload.params.id) return action.payload.params;
        return log;
      })
    case actionTypes.destroy:
      return action.payload.existingLogs.filter((log: IncomeLog) => {
        return log.id !== action.payload.params.id
      })
    case actionTypes.bulkDestroy:
      return action.payload.existingLogs.filter((log: IncomeLog) => {
        return !action.payload.params.includes(log.id)
      })
    default: return state
  }
}
