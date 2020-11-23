import Axios from './Axios'
import Asset from '../models/Asset'
import apiEndPoint from 'apiEndPoint'

export const updateAsset = (params: Asset) => {
  return new Promise((resolve, reject) => {
    const url = `${apiEndPoint.apiUri}/api/v1/assets`
    const newAsset = Asset.serialized(params)

    Axios.patch(url, newAsset)
      .then(response => {
        resolve(response.data)
      })
      .catch(response => {
        reject(response)
      })
  })
}
