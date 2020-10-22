import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TagList from './TagList';
import TagChart from './TagChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    leftContents: {
      flex: '1 0 400px',
    },
    rightContents: {
      flex: '4 0 400px',
    }
  })
)

const TagManagement: React.FC = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.leftContents}>
          <TagList />
        </div>
        <div className={classes.rightContents}>
          <TagChart />
        </div>
      </div>
    </React.Fragment>
  )
}

export default TagManagement
