import MonthlyExpenditure from "../models/MonthlyExpenditure"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE_MONTHLY_EXPENDITURE',
  create: 'CREATE_MONTHLY_EXPENDITURE',
  update: 'UPDATE_MONTHLY_EXPENDITURE',
  destroy: 'DESTROY_MONTHLY_EXPENDITURE',
}

// Action Creators
export function editMonthlyExpenditure(type: string, params: MonthlyExpenditure) {
  return async (dispatch, getState) => {
    const existingLogs = await getState().monthlyExpenditures

    return dispatch(
      {
        type: type,
        payload: { existingLogs, params }
      }
    )
  }
}

export function editMonthlyExpenditures(type: string, params: MonthlyExpenditure[] | number[]) {
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

export default function MonthlyExpendituresReducer(state = [], action: fluxAction) {
  switch (action.type) {
    case actionTypes.initialize:
      return action.payload.params
    case actionTypes.create:
      return null
    case actionTypes.update:
    case actionTypes.destroy:
    default: return state
  }
}
