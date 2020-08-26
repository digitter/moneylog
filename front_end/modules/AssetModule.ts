import Asset from "../models/Asset"

// Actions
const actionTypes = {
  editAssets: 'EDIT_ASSETS'
}

// Action Creators
export function editAssets(assets: Asset[]) {
  return async dispatch => {
    return dispatch(
      { type: actionTypes.editAssets, payload: assets }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any }
export default function AssetsReducer(state = {}, action: fluxAction) {
  switch (action.type) {
    case actionTypes.editAssets:
      return action.payload
    default: return state;
  }
}
