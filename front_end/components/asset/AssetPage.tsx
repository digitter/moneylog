import * as React from 'react'
import EditingAsset from './EditingAsset'
import Asset from '../../models/Asset'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  contentsTitle: {
    background: '#263238',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    borderRadius: 2,
    display: 'inline-block',
    padding: 5,
    fontWeight:  10,
    borderLeft: '5px solid #818ed3',
    borderRight: '5px solid #818ed3',
    marginBottom: 10,
  },
}))

const AssetPage: React.FC = () => {
  const classes = useStyles()
  const assets = useSelector(state => state.assets)

  return (
    <React.Fragment>
      <h3 className={classes.contentsTitle}>asset</h3>

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
