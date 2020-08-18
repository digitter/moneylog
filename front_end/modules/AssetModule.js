// Actions
const actionTypes = {
  editAssets: 'EDIT_ASSETS'
}

// Action Creators
export function editAssets(assets) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.editAssets, payload: assets }
    )
  }
}

// Reducer
const initialState = {}

export default function AssetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.editAssets:
      return action.payload
    default: return state;
  }
}
