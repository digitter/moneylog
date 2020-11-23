import Axios from './Axios'
import { errorMessage, errorMessages } from '../components/GlobalMessage'
import apiEndPoint from 'apiEndPoint'

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/logged_in`

    Axios.get(url)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}

type signupData = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export const userSignup = (user: signupData) => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/registrations`

    Axios.post(url, { user })
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        errorMessage(errorMessages.signup)
        reject(response)
      })
  })
}

export const userSignin = (user: { email: string, password: string }) => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/sessions`

    Axios.post(url, { user })
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        errorMessage(errorMessages.signin)
        reject(response)
      })
  })
}

export const userSignout = () => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/logout`

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
