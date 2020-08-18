import * as React from 'react'
import EditingAsset from './EditingAsset'
import { assetParams } from '../../models/Asset'

interface Props {
  assets: assetParams[]
}

const AssetPage = (props: Props) => {

  return (
    <React.Fragment>
      <h2>Asset</h2>

      {Object.keys(props.assets).length !== 0 ?
        props.assets.map((asset: assetParams, index: number) => {
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
