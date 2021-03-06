import React, { useState } from 'react';
import { Link as RLink } from 'react-router-dom';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  // Checkbox,
  CssBaseline,
  // FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { ErrorOutline, LockOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import useStyles from './Login.styles';
import Copyright from '../../components/copyright/Copyright';
import todoApi from '../../apis/todoApi';
import { authLogin } from '../../stores/actions/authAction';

export default function SignInSide(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    setBackdropOpen(true);

    todoApi({
      url: '/api/users/sign-in',
      method: 'POST',
      data: {
        email,
        password,
      },
    })
      .then((result) => {
        localStorage.clear();
        localStorage.setItem('token', result?.data?.token);
        localStorage.setItem('user', JSON.stringify(result?.data?.user));
        dispatch(authLogin());
        setBackdropOpen(false);
        props.history.replace('/');
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setBackdropOpen(false);
        }, 2000);
      });
  }

  async function handleLoginAsGuest(e) {
    e.preventDefault();
    setBackdropOpen(true);

    todoApi({
      url: '/api/users/sign-in',
      method: 'POST',
      data: {
        email: 'guest@mail.com',
        password: '123456',
      },
    })
      .then((result) => {
        localStorage.clear();
        localStorage.setItem('token', result?.data?.token);
        localStorage.setItem('user', JSON.stringify(result?.data?.user));
        dispatch(authLogin());
        setBackdropOpen(false);
        props.history.replace('/');
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setBackdropOpen(false);
        }, 2000);
      });
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{ type: 'email' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                inputProps={{ minLength: 6, maxLength: 32 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Remember Me */}
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
                Log In
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLoginAsGuest}
              >
                Log In as Guest
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="register" component={RLink} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        style={{ flexDirection: 'column' }}
      >
        {!isError ? (
          <CircularProgress color="inherit" size="10rem" />
        ) : (
          <>
            <ErrorOutline color="secondary" style={{ fontSize: '10rem' }} />
            <span style={{ fontSize: '3rem' }}>Error</span>
          </>
        )}
      </Backdrop>
    </>
  );
}
