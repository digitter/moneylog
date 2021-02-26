import * as React from 'react';
import { useSelector } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import ToggleSideBar from './ToggleSideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: '85px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '65px'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    }
  }),
);

export default function Header() {
  const classes = useStyles();
  const user = useSelector(state => state.user)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: '#263238' }}>
        <Toolbar>
          {Object.keys(user).length ?
            <Typography variant="h6" className={classes.menuButton}>
              <ToggleSideBar />
            </Typography>
          : null}

          <Typography variant="h6" className={classes.title}>
            <Box letterSpacing={5}>
              <Link to='/' style={{textDecoration: 'none', color: 'white', fontWeight: 500}}>
                moneylog
              </Link>
            </Box>
          </Typography>
          <Typography variant="subtitle1" className={classes.menuButton}>
            <Link to={`/settings`} style={{textDecoration: 'none', color: 'white'}}>
              {user.name}
            </Link>
          </Typography>
          <Typography variant="subtitle1" className={classes.menuButton}>
            {Object.keys(user).length ?
              <Link to={`/settings`}>
                <Avatar alt="Remy Sharp" src="public/images/hello.png" className={classes.avatar} />
              </Link>
            : null}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
