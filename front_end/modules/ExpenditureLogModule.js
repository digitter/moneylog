// Actions
const actionTypes = {
  editExpenditureLogs: 'EDIT_EXPENDITURE_LOGS'
}

// Action Creators
export function editExpenditureLogs(ExpenditureLogs) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.editExpenditureLogs, payload: ExpenditureLogs }
    )
  }
}

// Reducer
const initialState = {}

export default function ExpenditureLogsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.editExpenditureLogs:
      // return Object.assign({}, state, action.payload)
      return action.payload
    default: return state;
  }
}
