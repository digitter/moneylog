import axios from 'axios'

function getCookie(name: string): string {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const Axios = axios.create({ withCredentials: true })

Axios.interceptors.request.use((config) => {
  const token = getCookie('csrf-token')
  config.headers['X-CSRF-Token'] = token
  config.headers['Content-Type'] = 'application/json'

  return config
})

export default Axios
