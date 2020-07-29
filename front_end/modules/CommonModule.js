
// Actions
const actionTypes = {
  setInLoading: 'COMMON_SET_IN_LOADING',
}

// Action Creators
export function setInLoading(isLoading) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.setInLoading, payload: isLoading }
    )
  }
}

// Reducer
const initilalState = {}

export default function commonReducer(state = initilalState, action = {}) {
  switch (action.type) {
    case actionTypes.setInLoading:
      return Object.assign({}, state, { inLoading: action.payload })
    default: return state;
  }
}
