import * as React from 'react'
import EditingAsset from './EditingAsset'
import Asset from '../../models/Asset'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '90%',
    margin: '30px auto',
  },
  contentsTitle: {
    display: 'inline-block',
    textAlign: 'center',
    borderRadius: 2,
    padding: 5,
    margin: '20px auto',
    fontWeight:  10,
    letterSpacing: 2,
    background: '#263238',
    color: 'white',
    borderLeft: '5px solid #818ed3',
    borderRight: '5px solid #818ed3',
  },
}))

const AssetPage: React.FC = () => {
  const classes = useStyles()
  const assets = useSelector(state => state.assets)

  return (
    <React.Fragment>
      <div className={classes.root}>
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
      </div>
    </React.Fragment>
  )
}

export default AssetPage
