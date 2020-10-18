import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TagList from './TagList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    leftContents: {
      flex: '1 0 400px',
      border: '1px solid gray'
    },
    rightContents: {
      flex: '4 0 400px',
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
        <div className={classes.leftContents}>
          <TagList />
        </div>
        <div className={classes.rightContents}>
          <div>右にChart</div>
          <div>右にChart</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TagManagement
