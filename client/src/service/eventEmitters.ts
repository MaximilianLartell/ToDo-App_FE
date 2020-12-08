import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { PATH } from '../config';
import { Events, Socket, DefaultSocket } from '../types';
import { isSocket } from '../types/typeGuards';
import { setSocket } from '../store/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectSocket = (dispatch: Dispatch<any>): void => {
  const socket = io(PATH);
  socket.on('connect', () => {
    dispatch(setSocket(socket));
  });
};

export const createList = (
  socket: Socket | DefaultSocket,
  listName: string,
  creatorId: string
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.CREATE_LIST, { listName, creatorId });
  }
};

export const createItem = (
  socket: Socket | DefaultSocket,
  description: string,
  creatorId: string,
  listId: string
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.NEW_ITEM, { creatorId, listId, description });
  }
};

export const toggleDone = (
  socket: Socket | DefaultSocket,
  itemId: string
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.TOGGLE_DONE, itemId);
  }
};

export const deleteItem = (
  socket: Socket | DefaultSocket,
  itemId: string,
  listId: string
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.REMOVE_ITEM, itemId, listId);
  }
};

export const deleteList = (
  socket: Socket | DefaultSocket,
  listId: string
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.REMOVE_LIST, listId);
  }
};
