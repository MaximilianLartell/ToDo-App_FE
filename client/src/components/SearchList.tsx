import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

export default function SearchList(): React.ReactElement {
  const history = useHistory();
  const [listUrl, setListUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    const pathArr = /\/list\?listId=\w*/.exec(listUrl);
    if (pathArr === null) {
      setError('Invalid url');
      setListUrl('');
    } else {
      history.push(pathArr[0]);
    }
  };

  const handleChange = (value: string): void => {
    if (error !== '') setError('');
    setListUrl(value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        <Typography component='h1' variant='h5'>
          Search list by url
        </Typography>
        <Typography component='p' variant='subtitle1' color='error'>
          {error}
        </Typography>
        <form noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='url'
            label='List url'
            name='url'
            autoFocus
            value={listUrl}
            onChange={(e) => handleChange(e.target.value)}
          />
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
            <SearchIcon />
          </Button>
        </form>
      </div>
    </Container>
  );
}
