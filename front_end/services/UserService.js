import Axios from './Axios'

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3000/api/v1/logged_in'

    Axios.get(url)
      .then(response => {
        console.log(response)
        resolve(response)
      })
      .catch(res => {
        console.error(response)
        reject(response)
      })
  })
}

export const registUser = (user) => {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:3000/api/v1/registrations'

    Axios.post(url, { user })
      .then(response => {
        console.log(response)
        resolve(response)
      })
      .catch(response => {
        console.error(response)
        reject(response)
      })
  })
}
