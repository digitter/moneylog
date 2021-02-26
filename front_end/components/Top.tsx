import * as React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Header from './Header';
import { history } from '../modules/store'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '60px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '50px',
    }
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    height: '93vh',
    position: 'relative',
    backgroundImage: 'url(public/images/moneylog.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '270px'
    }
  },
  imageAuhtor: {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  imageLink: {
    color: 'white',
    "&:hover": {
      color: 'gray',
      textDecoration: 'none',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(8, 10),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(8, 10),
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  button: {
    margin: theme.spacing(1, 1, 1),
  },
  topIcon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));

function Copyright() {
  return (
    <Typography variant="overline" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        lifelog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Top() {
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click !')
    switch (event.currentTarget.name) {
      case 'signin':
        history.push('/signin')
        break;
      case 'signup':
        history.push('/signup')
        break;
      case 'about':
        // history.push('/')
        break;
      case 'reference':
        // history.push('/')
        break;
    }
  }

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid item sm={12} md={7} className={classes.image} >
          <span className={classes.imageAuhtor}>
            Photo by <a className={classes.imageLink} href="https://unsplash.com/@micheile?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Micheile Henderson </a>
            on <a className={classes.imageLink} href="https://unsplash.com/s/photos/money?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
          </span>
        </Grid>

        <Grid item sm={12} md={5}>
          <div className={classes.paper}>
            <Grid
              container
              justify='space-evenly'
              direction='column'
              alignItems='center'
             >
              <Grid item>
                <Button
                  name="signin"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={handleClick}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button
                  name="signup"
                  type="button"
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={handleClick}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  name="about"
                  type="button"
                  variant="outlined"
                  color="default"
                  className={classes.button}
                  onClick={handleClick}
                >
                  About
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                name="reference"
                type="button"
                variant="outlined"
                color="default"
                className={classes.button}
                onClick={handleClick}
              >
                Reference
              </Button>
            </Grid>
            <Grid item className={classes.topIcon}>
              <img src="public/images/loadingp.gif" />
            </Grid>
            <Grid item>
              <Copyright />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
