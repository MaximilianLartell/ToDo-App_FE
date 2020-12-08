import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions';
import { fetchUser } from './service/fetch';
import { User, ErrorMessage } from './types';
import { isUser, isError } from './types/typeGuards';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import './App.css';

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = window.location.href;
  const { search } = useLocation();
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

  return (
    <div className='App'>
      <Switch>
        <Route path='/sign-in'>
          <SignIn />
        </Route>
        <Route path='/sign-up'>
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
