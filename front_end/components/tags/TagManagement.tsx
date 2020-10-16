import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TagList from './TagList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 30,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    leftContent: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
    rightContent: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column'
    }
  })
)

interface Props {}

const TagManagement: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <h2>Tag List</h2>
      <div>作成機能</div>
      <TagList />
      <div>Chart</div>
    </React.Fragment>
  )
}

export default TagManagement
