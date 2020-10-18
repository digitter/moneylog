import * as React from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { userSignin } from '../../services/UserService'
import { successMessage, succesmMessages } from '../GlobalMessage'
// models
import User from '../../models/User'
import Asset from '../../models/Asset'
import ExpenditureLog from '../../models/ExpenditureLog'
import IncomeLog from '../../models/IncomeLog'
import MonthlyExpenditure from '../../models/MonthlyExpenditure'
import Tag from '../../models/Tag'
// modules
import { editUser } from '../../modules/UserModule'
import { editAssets } from '../../modules/AssetModule'
import { editExpenditureLogs, actionTypes as expenditureActionTypes } from '../../modules/ExpenditureLogModule'
import { editIncomeLogs, actionTypes as incomeActionTypes } from '../../modules/IncomeLogModule'
import { editMonthlyExpenditures, actionTypes as monthlyActionTypes } from '../../modules/MonthlyExpenditureModule'
import { history } from '../../modules/store'
import { Link } from 'react-router-dom'
import { editTags, tagActionTypes } from '../../modules/TagModule'

const { useState } = React

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://material-ui.com/">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const classes = useStyles()

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmail(event.currentTarget.value)
        break
      case 'password':
        setPassword(event.currentTarget.value)
        break
      default: return null
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const user = { email, password }

    userSignin(user)
      .then((jsonApiFormat: any) => {
        if (jsonApiFormat.data.type === 'user') { dispatch(editUser(User.fromJsonApi(jsonApiFormat))) }

        dispatch(editUser(jsonApiFormat.data.attributes))
        dispatch(editAssets(Asset.fromIncluded(jsonApiFormat)))
        dispatch(editExpenditureLogs(expenditureActionTypes.initialize, ExpenditureLog.fromIncluded(jsonApiFormat)))
        dispatch(editIncomeLogs(incomeActionTypes.initialize, IncomeLog.fromIncluded(jsonApiFormat)))
        dispatch(editMonthlyExpenditures(monthlyActionTypes.initialize, MonthlyExpenditure.fromIncluded(jsonApiFormat)))
        dispatch(editTags(tagActionTypes.initialize, Tag.fromIncluded(jsonApiFormat)))
      })
      .then(() => {
        history.replace('/')
        successMessage(succesmMessages.signin)
      })
      .catch(error => console.error('login error', error))
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                {/* <Link href="/signup" variant="body2"> */}
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Login
