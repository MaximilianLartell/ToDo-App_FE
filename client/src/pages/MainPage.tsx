import React, { useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from '../service/eventEmitters';
import { List, RootState } from '../types';
import { setCreatedLists } from '../store/actions';
import { fetchLists } from '../service/fetch';
import ListList from '../components/ListList';
import AddList from '../components/AddList';
import SearchList from '../components/SearchList';
import AppBar from '../components/AppBar';

import './MainPage.css';

export default function MainPage(): React.ReactElement {
  const dispatch = useDispatch();
  const { user, socket } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (user.userId !== '' || user.createdLists.length !== 0) {
      const listIds = user.createdLists.toString();
      fetchLists(`/api/lists/${listIds}`, (data: List[]) =>
        dispatch(setCreatedLists(data))
      );
    }
  }, [user]);

  useEffect(() => {
    if (!socket.connected) {
      connectSocket(dispatch);
    }
  }, [socket]);

  return (
    <div>
      <AppBar />
      <Grid
        container
        justify='center'
        direction='row-reverse'
        className='mainPageContainer'
      >
        <Grid item xs={12} md={6}>
          <div className='addListForm'>
            <Paper className='addListPaper'>
              <AddList />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className='listWrapper'>
            <Paper className='listPaper'>
              <SearchList />
              <div className='listListWrapper'>
                <ListList />
              </div>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
