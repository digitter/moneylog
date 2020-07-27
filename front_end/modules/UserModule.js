// Actions
const actionTypes = {
  setUser: 'SET_USER',
  unsetUser: 'UNSET_USER',
  isLoggedIn: 'IS_LOGGED_IN'
}
// Action Creators
export function setUser(user) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.setUser, payload: user }
    )
  }
}

export function unsetUser() {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.unsetUser, payload: null }
    )
  }
}

// Reducer
const initialState = { }

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.setUser:
      return  Object.assign({}, state, { user: action.payload, isLoggedIn: true })
    case actionTypes.unsetUser:
      return { }
    default: return state;
  }
}
