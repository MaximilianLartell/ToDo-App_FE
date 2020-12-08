import { Reducer } from 'redux';
import { User, UserActions, SET_USER, CLEAR_USER } from '../../types';

const defaultUser: User = {
  userId: '',
  userName: '',
  createdLists: [],
  subscribedLists: [],
  online: false,
};

const userReducer: Reducer<User, UserActions> = (
  state = defaultUser,
  { type, payload }
) => {
  switch (type) {
    case SET_USER:
      return payload;
    case CLEAR_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
