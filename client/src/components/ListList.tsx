import React from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, ListId, List as ListType } from '../types';
import { deleteList } from '../service/eventEmitters';

export default function ListList(): React.ReactElement {
  const history = useHistory();
  const { createdLists, socket, user } = useSelector(
    (state: RootState) => state
  );

  const selectList = (id: string) => {
    history.push(`/list?listId=${id}`);
  };

  const listItem = (listName: string, listId: ListId): React.ReactElement => {
    return (
      <ListItem
        key={listId + listName}
        button
        onClick={() => {
          selectList(listId);
        }}
      >
        <ListItemText primary={listName} />
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => {
              deleteList(socket, listId, user);
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
            {createdLists.map((el: ListType) =>
              listItem(el.listName, el.listId)
            )}
          </List>
        </div>
      </Grid>
    </div>
  );
}
