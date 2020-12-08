import { Dispatch } from 'redux';
import { Socket, User, Events, Item, List, CurrentList } from '../types';
import {
  setUser,
  setCurrentList,
  addItem,
  removeItem,
  updateItem,
  addCreatedList,
  removeList,
} from '../store/actions';

const eventHandlers = (
  socket: Socket,
  currentList: CurrentList,
  dispatch: Dispatch
): void => {
  socket.on(Events.CREATE_LIST, (list: List, user: User) => {
    dispatch(setUser(user));
    dispatch(addCreatedList(list));
  });
  socket.on(Events.REMOVE_LIST, (list: List) => {
    console.log('ping', list);
    dispatch(removeList(list));
  });
  socket.on(Events.NEW_ITEM, (newItem: Item, list: List) => {
    dispatch(setCurrentList({ ...currentList, ...list }));
    dispatch(addItem(newItem));
  });
  socket.on(Events.TOGGLE_DONE, (newItem: Item) => {
    dispatch(updateItem([newItem]));
  });
  socket.on(Events.REMOVE_ITEM, (item: Item) => {
    dispatch(removeItem([item]));
  });
};

export default eventHandlers;
