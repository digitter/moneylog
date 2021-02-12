
const fetchApiUrl = () => {
  console.log('node env', process.env.NODE_ENV)

  switch (process.env.NODE_ENV) {
    case 'devlocal':
    case 'development':
      return 'http://moneylog.com:3001'
    case 'staging':
      return 'https://api.digitter.info'
    default:
      return 'https://api.digitter.info'
  }
}

const apiUri = fetchApiUrl()

export default { apiUri }
