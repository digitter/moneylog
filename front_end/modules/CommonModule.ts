// Actions
const actionTypes = {
  setInLoading: 'COMMON_SET_IN_LOADING',
  setLoadingMessage: 'SET_LOADING_MESSAGE',
}

// Action Creators
export function setLoadingMessage(msg: string) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.setLoadingMessage, payload: msg }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any, meta: any }

export default function commonReducer(state = { loadingMsg: null }, action: fluxAction) {
  switch (action.type) {
    case actionTypes.setLoadingMessage:
      return { loadingMsg: action.payload }
    default: return state;
  }
}
