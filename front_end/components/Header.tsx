import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { userSignout } from '../services/UserService';
import { editUser } from '../modules/UserModule';
import ToggleSideBar from './ToggleSideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSignoutClick = () => {
    userSignout()
      .then(() => {
        dispatch(editUser(null))
        window.location.href = '/'
      })
  }

  return (
    <div className={classes.root} style={{marginBottom: "65px"}}>
      <AppBar position="fixed" style={{ backgroundColor: '#2E3947' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.menuButton}>
            <ToggleSideBar />
          </Typography>

          {Object.keys(user).length
            ? (
                <>
                  <Typography variant="h6" className={classes.title}>
                    <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
                      moneylog
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" className={classes.menuButton}>
                    <Link to='/hoge' style={{textDecoration: 'none', color: 'white'}}>
                      current page
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" className={classes.menuButton}>
                    <Link onClick={handleSignoutClick} to='/' style={{textDecoration: 'none', color: 'white'}}>
                      Signout
                    </Link>
                  </Typography>
                  {user.name}
                  <img src ="/public/hello.png" style={{width: 40, height: 40}} />
                </>
              )
            : (
                <>
                  <Typography variant="h6" className={classes.title}>
                    <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
                      moneylog
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" className={classes.menuButton}>
                    <Link to='/signup' style={{textDecoration: 'none', color: 'white'}}>
                      Sign Up
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" className={classes.menuButton}>
                    <Link to='signin' style={{textDecoration: 'none', color: 'white'}}>
                      Sign In
                    </Link>
                  </Typography>
                </>
              )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
