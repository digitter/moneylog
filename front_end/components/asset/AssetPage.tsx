import * as React from 'react'
import EditingAsset from './EditingAsset'
import Asset from '../../models/Asset'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  contentsTitle: {
    color: '#26323',
    textAlign: 'center',
    letterSpacing: 3,
    borderRadius: 5,
    display: 'inline-block',
    padding: 10,
    fontWeight:  10,
    borderBottom: '3px solid #263238',
    borderRight: '3px solid #263238',
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
