import Axios from './Axios'
import Tag from '../models/Tag'
import ExpenditureLog from '../models/ExpenditureLog'

export const createTag = (tag: Tag) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/tags'
    const newTag = Tag.serialized(tag)

    Axios.post(url, newTag)
      .then(response => {
        const newTag = Tag.fromJsonApi(response.data)
        resolve(newTag)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const updateTag = (tag: Tag) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/tags/${tag.id}`
    const updatedTag = Tag.serialized(tag)

    Axios.patch(url, updatedTag)
      .then(response => {
        const updatedLog = Tag.fromJsonApi(response.data)
        resolve(updatedLog)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const deleteTag = (tag: Tag) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/tags/${tag.id}`

    Axios.delete(url)
      .then(() => {
        resolve(tag)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const relateToExpneditureLog = (tags: Tag[], log: ExpenditureLog) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/tags/${log.id}/expenditure_log`
    const tagIds: number[] = Tag.extractIds(tags)

    Axios.post(url, { ids: tagIds })
      .then(response => {
        resolve(response)
      })
      .catch(response => {
        reject(response)
      })
  })
}
