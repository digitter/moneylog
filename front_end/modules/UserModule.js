// Actions
const actionTypes = {
  fetchUser: 'fetch_user'
}
// Action Creators
export function setUser(user) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.fetchUser, payload: user }
    )
  }
}
// Reducer
const initialState = {}

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.fetchUser:
      return  Object.assign({}, state, { user: action.payload })
    default: return state;
  }
}
