// Actions
const actionTypes = {
  editUser: 'EDIT_USER',
  isLoggedIn: 'IS_LOGGED_IN'
}

// Action Creators
export function editUser(user) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.editUser, payload: user }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any, meta: any }

export default function UserReducer(state = {}, action: fluxAction) {
  switch (action.type) {
    case actionTypes.editUser:
      return  Object.assign({}, state, action.payload )
    case actionTypes.editUser:
      return {}
    default: return state;
  }
}
