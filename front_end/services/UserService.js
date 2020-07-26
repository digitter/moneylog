import Axios from './Axios'

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3000/api/v1/logged_in'

    Axios.get(url)
      .then(response => {
        resolve(response)
      })
      .catch(res => {
        reject(response)
      })
  })
}

export const userSignup = (user) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3000/api/v1/registrations'

    Axios.post(url, { user })
      .then(response => {
        resolve(response)
      })
      .catch(response => {
        reject(response)
      })
  })
}

export const userSignin = (user) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3000/api/v1/sessions'

    Axios.post(url, { user })
      .then(response => {
        resolve(response)
      })
      .catch(response => {
        reject(response)
      })
  })
}
