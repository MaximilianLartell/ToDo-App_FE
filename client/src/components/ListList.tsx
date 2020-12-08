import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { deleteList } from '../service/eventEmitters';

export default function ListList(): React.ReactElement {
  const history = useHistory();
  const { createdLists, socket } = useSelector((state: RootState) => state);

  const selectList = (id: string) => {
    history.push(`/list?listId=${id}`);
  };

  const listItem = (listName: string, id: string): React.ReactElement => {
    return (
      <ListItem
        key={id}
        button
        onClick={() => {
          selectList(id);
        }}
      >
        <ListItemText primary={listName} />
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => {
              deleteList(socket, id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <div className='root'>
      <Grid item xs={12} md={12}>
        <Typography variant='h6' className='title'>
          My lists
        </Typography>
        <div className='demo'>
          <List>
            {createdLists.map((el) => listItem(el.listName, el.listId))}
          </List>
        </div>
        {/* <Typography variant='h6' className={classes.title}>
          My SubscribedLists
        </Typography>
        <div className={classes.demo}>
          <List>{lists.map((el) => listItem(el.listName, el.listId))}</List>
        </div> */}
      </Grid>
    </div>
  );
}
