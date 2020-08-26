import ExpenditureLog from "../models/ExpenditureLog"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE',
  reset: 'RESET'
}

type editLogsType = ExpenditureLog | ExpenditureLog[] | null
// Action Creators
export function editExpenditureLogs<T extends editLogsType>(type: string, payload: T) {
  return async dispatch => {
    return dispatch(
      { type: type, payload: payload }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any, meta: any }

export default function ExpenditureLogsReducer(state = [], action: fluxAction) {
  switch (action.type) {
    case actionTypes.initialize:
      return action.payload
     case actionTypes.reset:
       return null
    default: return state
  }
}
