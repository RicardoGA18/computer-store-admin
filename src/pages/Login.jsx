import React from 'react'
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import logoFull from '../assets/logoFull.png'
import LoginForm from '../components/LoginForm'

const useStyles = makeStyles({
  mainContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#a2b5c9',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: 10,
    marginTop: -40,
  },
  paddingPaper: {
    padding: 20,
  },
  logoContainer: {
    textAlign: 'center'
  },
  logo: {
    width: 100
  }
})

const Login = () => {
  const classes = useStyles()

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <Paper elevation={2} className={classes.paddingPaper}>
          <Grid container spacing={2}>
            <Grid item xs={12}> 
              <div className={classes.logoContainer}>
                <img className={classes.logo} src={logoFull} alt="Computer Store Logo" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Iniciar Sesión</Typography>
              <Typography variant="overline" align="center" component="p">* Solo Administradores</Typography>
            </Grid>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default Login
