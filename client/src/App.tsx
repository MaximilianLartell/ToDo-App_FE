import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './service/fetch';
import { setUser } from './store/actions';
import eventHandlers from './service/eventHandlers';
import { User, ErrorMessage, RootState } from './types';
import { isUser, isError, isSocket } from './types/typeGuards';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket, currentList } = useSelector((state: RootState) => state);
  const { search } = useLocation();
  const url = window.location.href;
  const listId = new URLSearchParams(search).get('listId');

  const handleRes = (data: User | ErrorMessage) => {
    if (isUser(data)) {
      switch (true) {
        case listId !== null:
          dispatch(setUser(data));
          history.push(`/list?listId=${listId}`);
          break;
        case !url.includes(`/list`):
          dispatch(setUser(data));
          history.push('/my-lists');
          break;
        default:
          sessionStorage.removeItem('userId');
          history.push('/sign-in');
      }
    }
    if (isError(data)) {
      sessionStorage.removeItem('userId');
      history.push('/sign-in');
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      fetchUser(`/api/user/${userId}`, handleRes);
    }
    if (!userId && !url.includes('/sign-up')) history.push('/sign-in');
  }, []);

  useEffect(() => {
    if (isSocket(socket)) {
      eventHandlers(socket, currentList, dispatch);
    }
  }, [socket]);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/sign-in'>
          <SignIn />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/my-lists'>
          <MainPage />
        </Route>
        <Route path='/list'>
          <ListPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
