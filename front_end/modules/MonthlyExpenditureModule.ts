import MonthlyExpenditure from "../models/MonthlyExpenditure"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE_MONTHLY_EXPENDITURE',
  reset: 'RESET_MONTHLY_EXPENDITURE'
}

// Action Creators
export function editMonthlyExpenditures(type: string, params: MonthlyExpenditure[] | number[]) {
  return async (dispatch, getState) => {
    const existingData = await getState().expenditureLogs

    return dispatch(
      {
        type: type,
        payload: { existingData, params }
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
    case actionTypes.reset:
      return null
    default: return state
  }
}
