import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { updateItem } from '../store/actions';
import { toggleDone, deleteItem } from '../service/eventEmitters';

export default function ItemList(): React.ReactElement {
  const dispatch = useDispatch();
  const { socket, currentList, items } = useSelector(
    (state: RootState) => state
  );

  const handleToggle = (id: string) => {
    const newItem = items.find((i) => i.itemId === id);
    if (newItem) {
      dispatch(updateItem([{ ...newItem, done: !newItem.done }]));
    }
    toggleDone(socket, id);
  };

  const listItem = (
    description: string,
    id: string,
    done: boolean
  ): React.ReactElement => {
    return (
      <ListItem button key={id} id={id} onClick={() => handleToggle(id)}>
        <ListItemText primary={description} color='secondary' />
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='check'
            onClick={() => handleToggle(id)}
          >
            {done ? (
              <CheckBoxOutlinedIcon color='secondary' />
            ) : (
              <CheckBoxOutlineBlankOutlinedIcon color='primary' />
            )}
          </IconButton>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => deleteItem(socket, id, currentList.listId)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  const render = () => {
    if (currentList.displayOpt === 'PENDING') {
      return items
        .filter((item) => item.done === false)
        .map((el) => listItem(el.description, el.itemId, el.done));
    }
    if (currentList.displayOpt === 'DONE') {
      return items
        .filter((item) => item.done === true)
        .map((el) => listItem(el.description, el.itemId, el.done));
    }
    return items.map((el) => listItem(el.description, el.itemId, el.done));
  };

  return (
    <div className='itemListWrapper'>
      <Grid item xs={12} md={12}>
        <Typography variant='h6' className='title'>
          Reminders
        </Typography>
        <div className='demo'>
          <List>{render()}</List>
        </div>
      </Grid>
    </div>
  );
}
