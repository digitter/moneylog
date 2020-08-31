import Axios from './Axios'
import { errorMessage } from '../GlobalMessage'

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/logged_in'

    Axios.get(url)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const userSignup = (user) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/registrations'

    Axios.post(url, { user })
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        errorMessage(response)
        reject(response)
      })
  })
}

export const userSignin = (user) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/sessions'

    Axios.post(url, { user })
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        errorMessage(response)
        reject(response)
      })
  })
}

export const userSignout = () => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3001/api/v1/logout'

    Axios.delete(url)
      .then(response => {
        resolve(response)
      })
      .catch(response => {
        errorMessage(response)
        reject(response)
      })
  })
}
