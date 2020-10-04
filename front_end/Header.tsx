import * as React from 'react';
import { useSelector } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from './components/auth/Logout';
import { Link } from 'react-router-dom';

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


  return (
    <div className={classes.root} style={{marginBottom: "65px"}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
              moneylog
            </Link>
          </Typography>

          {Object.keys(user).length
            ? (
                <>
                  <Typography variant="h6" className={classes.menuButton}>
                    Asset
                  </Typography>
                  <Typography variant="h6" className={classes.menuButton}>
                    Expenditure
                  </Typography>
                  <Typography variant="h6" className={classes.menuButton}>
                    Income
                  </Typography>
                  <Button color="inherit">
                    <Logout/>
                  </Button>
                  {user.name}
                  <img src ="/public/hello.png" style={{width: 40, height: 40}} />
                </>
              )
            : (
                <>
                  <Link to='/signup' style={{textDecoration: 'none', color: 'white'}}>
                    <Button color="inherit">SIGNUP</Button>
                  </Link>
                  <Link to='signin' style={{textDecoration: 'none', color: 'white'}}>
                    <Button color="inherit">SIGNIN</Button>
                  </Link>
                </>
              )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
