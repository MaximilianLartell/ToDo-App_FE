import { combineReducers } from 'redux';
import currentListReducer from './currentListReducer';
import itemsReducer from './itemsReducer';
import userReducer from './userReducer';
import createdListsReducer from './createdListsReducer';
import socketReducer from './socketReducer';

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  createdLists: createdListsReducer,
  currentList: currentListReducer,
  items: itemsReducer,
});

export default rootReducer;
