import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Typography,
  Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions';
import { postCredentials } from '../service/fetch';
import { UserName, User, ErrorMessage } from '../types';
import { isUser, isError } from '../types/typeGuards';
import './SignIn.css';

export default function SignIn(): React.ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<UserName>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRes = (data: User | ErrorMessage) => {
    if (isError(data)) setError('Incorrect username or password');
    if (isUser(data)) {
      dispatch(setUser(data));
      sessionStorage.setItem('userId', data.userId);
      history.push('/my-lists');
    }
  };
  // api/auth/sign-in
  const handleSubmit = () => {
    postCredentials('/api/auth/sign-in', { userName, password }, handleRes);
    setUserName('');
    setPassword('');
    setError('');
  };

  const handleChange = (name: string, value: string): void => {
    if (name === 'userName') setUserName(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Paper className='signInWrapper'>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Typography component='p' variant='subtitle1' color='error'>
          {error}
        </Typography>
        <form className='signInForm' noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='userName'
            label='Username'
            name='userName'
            autoComplete='userName'
            autoFocus
            value={userName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <div className='signInButton'>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className='signInButton'
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Sign In
            </Button>
          </div>

          <div className='signUpLink'>
            <Link href='/sign-up' variant='body2'>
              Don&#39;t have an account? Sign Up
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
