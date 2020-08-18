import * as React from 'react'
import EditingAsset from './EditingAsset'

interface Props {
  asset: any
}

const AssetPage = (props: Props) => {

  return (
    <React.Fragment>
      <h2>Asset</h2>
      <p>{props.asset.title}</p>
      <p>Description: {props.asset.content}</p>
      <p><strong>{props.asset.amount}</strong></p>
      <EditingAsset />
    </React.Fragment>
  )
}

export default AssetPage
