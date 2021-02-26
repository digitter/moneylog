import * as React from 'react';
// ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux'
import { history } from '../../modules/store'
// requests
import { userSignup } from '../../services/UserService';
// models
import User from '../../models/User';
import Asset from '../../models/Asset';
import MonthlyExpenditure from '../../models/MonthlyExpenditure';
import ExpenditureLog from '../../models/ExpenditureLog';
import IncomeLog from '../../models/IncomeLog';
import { successMessage, succesmMessages } from '../GlobalMessage';
import Tag from '../../models/Tag';
// module
import { editUser } from '../../modules/UserModule';
import { editAssets } from '../../modules/AssetModule';
import { editExpenditureLogs, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule';
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule';
import { editMonthlyExpenditures, actionTypes as monthlyActionTypes } from '../../modules/MonthlyExpenditureModule';
import { editTags, tagActionTypes } from '../../modules/TagModule';
import Header from '../Header';


const { useState } = React

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="https://material-ui.com/">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {}

const SignUp: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [password_confirmation, setPasswordConfirmation] = useState(null)

  const classes = useStyles();

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value)
        break
      case 'email':
        setEmail(event.currentTarget.value)
        break
      case 'password':
        setPassword(event.currentTarget.value)
        break
      case 'userName':
        setName(event.currentTarget.value)
        break
      case 'passwordConfirmation':
        setPasswordConfirmation(event.currentTarget.value)
        break
      default: return null
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const signupData = { name, email, password, password_confirmation }

    userSignup(signupData)
      .then((jsonApiFormat: any) => {
        if (jsonApiFormat.data.type === 'user') { dispatch(editUser(User.fromJsonApi(jsonApiFormat))) }

        dispatch(editUser(jsonApiFormat.data.attributes))
        dispatch(editAssets(Asset.fromIncluded(jsonApiFormat)))
        dispatch(editMonthlyExpenditures(monthlyActionTypes.initialize, MonthlyExpenditure.fromIncluded(jsonApiFormat)))
        dispatch(editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat)))
        dispatch(editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat)))
        dispatch(editTags(tagActionTypes.initialize, Tag.fromIncluded(jsonApiFormat)))
      })
      .then(() => {
        history.replace('/')
        successMessage(succesmMessages.signup)
      })
      .catch(error => console.error(error))
  }

  return (
    <React.Fragment>
      <Header />

      <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>


              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmation"
                  label="Confirmation"
                  type="password"
                  id="comfirmation"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to='/signin'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default SignUp
