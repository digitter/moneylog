import * as React from 'react'
import EditingAsset from './EditingAsset'
import Asset from '../../models/Asset'
import { useSelector } from 'react-redux'

const AssetPage: React.FC = () => {
  const assets = useSelector(state => state.assets)

  return (
    <React.Fragment>
      <h2>Asset</h2>

      {Object.keys(assets).length ?
        assets.map((asset: Asset, index: number) => {
          return (
            <div key={index}>
              <p>{asset.title}</p>
              <p>Description: {asset.content}</p>
              <p><strong>{asset.amount}</strong></p>
              <EditingAsset asset={asset} />
            </div>
          )
        })
      : null}
    </React.Fragment>
  )
}

export default AssetPage
