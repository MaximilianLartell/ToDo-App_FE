import io from 'socket.io-client';
import { Dispatch } from 'redux';
import PATH from '../config';
import { Events, Socket, DefaultSocket, User, ListId } from '../types';
import { isSocket } from '../types/typeGuards';
import { setSocket } from '../store/actions';

export const connectSocket = (dispatch: Dispatch): void => {
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

export const joinList = (
  socket: Socket | DefaultSocket,
  listId: ListId
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.JOIN_LIST, listId);
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
  listId: ListId,
  user: User
): void => {
  if (isSocket(socket)) {
    socket.emit(Events.REMOVE_LIST, listId, user);
  }
};

export const signOut = (socket: Socket | DefaultSocket, user: User): void => {
  if (isSocket(socket)) {
    socket.emit(Events.SIGN_OUT, user);
    socket.close();
  }
};
