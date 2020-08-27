
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
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any, meta: any }

export default function commonReducer(state = {}, action: fluxAction) {
  switch (action.type) {
    case actionTypes.setInLoading:
      return Object.assign({}, state, { inLoading: action.payload })
    default: return state;
  }
}
