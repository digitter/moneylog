import ExpenditureLog from "../models/ExpenditureLog"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE_EXPENDITURE_LOGS',
  reset: 'RESET_EXPENDITURE_LOG',
  create: 'CREATE_EXPENDITURE_LOG',
  update: 'UPDATE_EXPENDITURE_LOG',
  destroy: 'DESTROY_EXPENDITURE_LOG',
  bulkDestroy: 'BULK_DESTROY_EXPENDITURE_LOG',
  updateTagsRelated: 'UPDATE_TAGS_RELATED_TO_EXPENDITURE'
}

// Action Creators
export function editExpenditureLogs(type: string, params: ExpenditureLog[] | number[]) {
  return async (dispatch, getState) => {
    const existingLogs = await getState().expenditureLogs

    return dispatch(
      {
        type: type,
        payload: { existingLogs, params }
      }
    )
  }
}

export function editExpenditureLog(type: string, params: ExpenditureLog) {
  return async (dispatch, getState) => {
    const existingLogs = await getState().expenditureLogs

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

export default function ExpenditureLogsReducer(state = [], action: fluxAction) {
  switch (action.type) {
    case actionTypes.initialize:
      return action.payload.params
    case actionTypes.reset:
      return null
    case actionTypes.create:
      return [action.payload.params, ...action.payload.existingLogs]
    case actionTypes.update:
    case actionTypes.updateTagsRelated:
      return action.payload.existingLogs.map((log: ExpenditureLog) => {
        if (log.id == action.payload.params.id) return action.payload.params;
        return log;
      })
    case actionTypes.destroy:
      return action.payload.existingLogs.filter((log: ExpenditureLog) => {
        return log.id !== action.payload.params.id
      })
    case actionTypes.bulkDestroy:
      return action.payload.existingLogs.filter((log: ExpenditureLog) => {
        return !action.payload.params.includes(log.id)
      })
    default: return state
  }
}
