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
import './SignUp.css';

export default function SignUp(): React.ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<UserName>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRes = (data: User | ErrorMessage) => {
    if (isError(data)) setError('Username is taken');
    if (isUser(data)) {
      dispatch(setUser(data));
      sessionStorage.setItem('userId', data.userId);
      history.push('/my-lists');
    }
  };

  const handleSubmit = () => {
    postCredentials('/api/users/', { userName, password }, handleRes);
    setUserName('');
    setPassword('');
    setError('');
  };

  const handleChange = (name: string, value: string): void => {
    if (name === 'userName') setUserName(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Paper className='signUpWrapper'>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Typography component='p' variant='subtitle1' color='error'>
            {error}
          </Typography>

          <form className='signUpForm' noValidate>
            <div className='signUpTextField'>
              <TextField
                name='userName'
                variant='outlined'
                required
                fullWidth
                id='userName'
                label='Username'
                autoFocus
                placeholder='Username'
                value={userName}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className='signUpTextField'>
              <TextField
                className='signUpTextField'
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className='signUpButton'>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Sign Up
              </Button>
            </div>
            <div className='signInLink'>
              <Link href='/sign-in' variant='body2'>
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
