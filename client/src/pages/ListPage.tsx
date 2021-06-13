import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListForm from '../components/ListForm';
import ItemList from '../components/ItemList';
import AppBar from '../components/AppBar';
import { fetchLists, fetchItems } from '../service/fetch';
import { connectSocket, joinList } from '../service/eventEmitters';
import { RootState, List, Item } from '../types';
import { isSocket } from '../types/typeGuards';
import { setCurrentList, setItems } from '../store/actions';
import './ListPage.css';

function ListPage(): React.ReactElement {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { socket, user } = useSelector((state: RootState) => state);
  const [error, setError] = useState<string | undefined>();
  const listId = new URLSearchParams(search).get('listId');

  useEffect(() => {
    fetchLists(`/api/lists/${listId}`, (data: List[]) => {
      if (data.length === 0) {
        setError('This list does not seem to exist');
      } else {
        const list = data[0];
        const newCurrent = {
          ...list,
          isCreator: list.creatorId === user.userId,
          subscribed: list.users.includes(user.userId),
          displayOpt: 'ALL',
        };
        dispatch(setCurrentList(newCurrent));
        if (list.items.toString() !== '') {
          fetchItems(`/api/items/${list.items.toString()}`, (items: Item[]) => {
            dispatch(setItems(items));
          });
        } else {
          dispatch(setItems([]));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      connectSocket(dispatch);
    }
    if (isSocket(socket) && listId) {
      joinList(socket, listId);
    }
  }, [socket, listId]);

  return (
    <div>
      <AppBar />
      {error ? (
        <h1>{error}</h1>
      ) : (
        <Grid
          container
          justify='center'
          direction='column'
          className='listPageContainer'
        >
          <Grid item xs={12}>
            <Paper className='listForm'>
              <ListForm />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className='itemList'>
              <ItemList />
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ListPage;
