import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { createItem } from '../service/eventEmitters';
import { setCurrentList } from '../store/actions';
import './ListForm.css';

export default function ListForm(): React.ReactElement {
  const dispatch = useDispatch();
  const { socket, user, currentList } = useSelector(
    (state: RootState) => state
  );
  const [description, setDescription] = useState<string>('');

  const handleDisplayOpt = (opt: string) => {
    dispatch(setCurrentList({ ...currentList, displayOpt: opt }));
    console.log(opt);
  };

  const handleSubmit = () => {
    console.log(description);
    createItem(socket, description, user.userId, currentList.listId);
    setDescription('');
  };
  const handleChange = (str: string): void => {
    setDescription(str);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className='paper'>
        <Typography component='h1' variant='h5'>
          {currentList.listName}
        </Typography>
        <form className='form' noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='reminder'
            label='Add reminder'
            name='reminder'
            autoComplete='reminder'
            autoFocus
            value={description}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className='submit'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Add
          </Button>
          <div className='formControll'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>
                Which items do you want to display?
              </FormLabel>
              <Grid container>
                <RadioGroup
                  aria-label='displayOptions'
                  name='displayOptions'
                  value={currentList.displayOpt}
                  onChange={(e) => {
                    handleDisplayOpt(e.target.value);
                  }}
                >
                  <div className='radioButtons'>
                    <FormControlLabel
                      value='ALL'
                      control={<Radio />}
                      label='All'
                    />
                    <FormControlLabel
                      value='PENDING'
                      control={<Radio />}
                      label='Pending'
                    />
                    <FormControlLabel
                      value='DONE'
                      control={<Radio />}
                      label='Done'
                    />
                  </div>
                </RadioGroup>
              </Grid>
            </FormControl>
          </div>
        </form>
      </div>
    </Container>
  );
}
