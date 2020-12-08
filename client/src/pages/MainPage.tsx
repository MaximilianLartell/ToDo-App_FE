import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from '../service/eventEmitters';
import { Events, List, User, RootState } from '../types';
import { isSocket } from '../types/typeGuards';
import {
  setUser,
  addCreatedList,
  setCreatedLists,
  removeList,
} from '../store/actions';
import { fetchLists } from '../service/fetch';
import ListList from '../components/ListList';
import AddList from '../components/AddList';
import SearchList from '../components/SearchList';
import './MainPage.css';

export default function MainPage(): React.ReactElement {
  const dispatch = useDispatch();
  const { user, socket } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (user.userId !== '') {
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
    if (isSocket(socket)) {
      socket.on(Events.CREATE_LIST, (list: List, user: User) => {
        dispatch(setUser(user));
        dispatch(addCreatedList(list));
      });
      socket.on(Events.REMOVE_LIST, (list: List) => {
        console.log('ping', list);
        dispatch(removeList(list));
      });
    }
  }, [socket]);
  return (
    <div>
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
