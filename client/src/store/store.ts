import { createStore, combineReducers, compose } from 'redux';
import {
  userReducer,
  socketReducer,
  createdListsReducer,
  currentListReducer,
  itemsReducer,
} from './reducers';

export const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  createdLists: createdListsReducer,
  currentList: currentListReducer,
  items: itemsReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
