import Tag from "../models/Tag"
import { Reducer } from "redux"

// Actions
export const actionTypes = {
  initialize: 'INITIALIZE_MONTHLY_TAGS',
  reset: 'RESET_MONTHLY_TAGS',
  create: 'CREATE_TAG',
  update: 'UPDATE_TAG',
  destroy: 'DESTROY_TAG'
}

// Action Creators
export function editTag(type: string, params: Tag) {
  return async (dispatch, getState) => {
    const existingTags = await getState().tags

    return dispatch(
      {
        type: type,
        payload: { existingTags, params }
      }
    )
  }
}

export function editTags(type: string, params: Tag[]) {
  return async (dispatch, getState) => {
    const existingTags = await getState().tags

    return dispatch(
      {
        type: type,
        payload: { existingTags, params }
      }
    )
  }
}

// Reducer
// TODO: Flux actionの型整理
type fluxAction = { type: string, payload: any }

const TagsReducer: Reducer<Tag[] | Tag> = (state = [], action: fluxAction) => {
  switch (action.type) {
    case actionTypes.initialize:
      return action.payload.params
    case actionTypes.reset:
      return null
    case actionTypes.create:
      return [action.payload.params, ...action.payload.existingTags]
    case actionTypes.update:
      return action.payload.existingTags.map((tag: Tag) => {
        if (tag.id == action.payload.params.id) return action.payload.params;
        return tag;
      })
    default: return state
  }
}

export default TagsReducer
