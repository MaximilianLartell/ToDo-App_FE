import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { createList } from '../service/eventEmitters';
import { RootState } from '../types';
import './AddList.css';

export default function AddList(): React.ReactElement {
  const { socket, user } = useSelector((state: RootState) => state);
  const [listName, setListName] = useState<string>('');

  const handleSubmit = () => {
    console.log(socket);
    createList(socket, listName, user.userId);
    setListName('');
  };

  const handleChange = (value: string): void => {
    setListName(value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className='addListWrapper'>
        <Typography component='h1' variant='h5'>
          Add new list
        </Typography>
        {/* <Typography component='p' variant='subtitle1' color='error'>
          {error}
        </Typography> */}
        <form noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='listName'
            label='Listname'
            name='listName'
            autoComplete='listName'
            value={listName}
            autoFocus
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
            Create list
          </Button>
        </form>
      </div>
    </Container>
  );
}
