import Axios from './Axios'
import Asset from '../models/Asset'

export const updateAsset = (params: Asset) => {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/api/v1/assets`
    const newAsset = Asset.newInstance(params)

    Axios.patch(url, newAsset)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}
