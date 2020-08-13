import * as React from 'react'
import EditingAsset from './EditingAsset'

interface Props {
  asset: any
}

const Asset = (props: Props) => {

  return (
    <React.Fragment>
      <h2>{props.asset.title}</h2>
      <p>Description: {props.asset.content}</p>
      <p><strong>{props.asset.amount}</strong></p>
      <EditingAsset />
    </React.Fragment>
  )
}

export default Asset
