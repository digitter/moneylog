import axios from 'axios'

const Axios = axios.create({ withCredentials: true })

Axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('auth-token')
  config.headers['X-CSRF-Token'] = token
  config.headers['Content-Type'] = 'application/json'

  return config
})

Axios.interceptors.response.use((response) => {
  const token = response.headers['x-csrf-token']
  window.localStorage.setItem('auth-token', token)

  return response
})

export default Axios
