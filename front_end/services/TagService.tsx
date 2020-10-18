import Axios from './Axios'
import Tag from '../models/Tag'

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
