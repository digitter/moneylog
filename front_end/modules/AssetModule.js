// Actions
const actionTypes = {
  editAsset: 'EDIT_ASSET',
  resetAsset: 'RESET_ASSET'
}

// Action Creators
export function editAsset(asset) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.editAsset, payload: asset }
    )
  }
}

// Reducer
const initialState = {}

export default function AssetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.editAsset:
      return Object.assign({}, state, { assets: action.payload })
    default: return state;
  }
}
