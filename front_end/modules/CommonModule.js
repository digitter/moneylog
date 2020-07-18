
// Actions
const actionTypes = {
  setInLoading: 'COMMON_SET_IN_LOADING',
  setUser: 'COMMON_SET_USER'
}

// Action Creators
export function setInLoading(inLoading) {
  return {
    type: actionTypes.setInLoading,
    payload: { inLoading }
  }
}

export function setUser(user) {
  return {
    type: actionTypes.setUser,
    payload: user
  }
}

// Reducer
const initilalState = { }

export default function commonReducer(state = initilalState, action = {}) {
  switch (action.type) {
    case actionTypes.setInLoading:
      return Object.assign({}, state, action.payload)
    default: return state;
  }
}
