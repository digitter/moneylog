
const fetchApiUrl = () => {
  console.log('node env', process.env.NODE_ENV)
  console.log('target', process.env.TARGET_ENV)

  switch (process.env.NODE_ENV) {
    case 'devlocal':
    case 'development':
      return 'http://localhost:3001'
    case 'staging':
      return 'https://api.digitter.info'
    default:
      return 'https://api.digitter.info'
  }
}

const apiUri = fetchApiUrl()

export default { apiUri }