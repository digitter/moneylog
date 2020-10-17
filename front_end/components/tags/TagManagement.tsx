import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TagList from './TagList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      border: '1px solid gray'
    },
    sideContents: {
      flex: '1 0 400px',
      background: '#ddd',
      border: '1px solid gray'
    }
  })
)

const TagManagement: React.FC = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <h2>Tag List</h2>

      <div className={classes.root}>
        <div className={classes.sideContents}>
          <TagList />
        </div>
        <div className={classes.sideContents}>
          <div>右にChart</div>
          <div>右にChart</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TagManagement
