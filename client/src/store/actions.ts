import {
  Socket,
  User,
  CurrentList,
  UserActions,
  SocketActions,
  CurrentListActions,
  ItemActions,
  NEW_SOCKET,
  DISCONNECT,
  SET_USER,
  ADD_CREATED_LIST,
  REMOVE_LIST,
  SET_CREATED_LISTS,
  SET_CURRENT_LIST,
  ADD_ITEM,
  SET_ITEMS,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ListActions,
  List,
  Item,
} from '../types';

const defaultSocket = {
  connected: false,
  disconnected: true,
  id: undefined,
};

export const setSocket = (socket: Socket): SocketActions => {
  return { type: NEW_SOCKET, payload: socket };
};

export const disconnect = (): SocketActions => ({
  type: DISCONNECT,
  payload: defaultSocket,
});

export const setUser = (user: User): UserActions => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = (user: User): UserActions => ({
  type: SET_USER,
  payload: user,
});

export const addCreatedList = (list: List): ListActions => ({
  type: ADD_CREATED_LIST,
  payload: [list],
});

export const removeList = (list: List): ListActions => ({
  type: REMOVE_LIST,
  payload: [list],
});

export const setCreatedLists = (lists: List[]): ListActions => ({
  type: SET_CREATED_LISTS,
  payload: lists,
});

export const setCurrentList = (list: CurrentList): CurrentListActions => ({
  type: SET_CURRENT_LIST,
  payload: list,
});

export const addItem = (item: Item): ItemActions => ({
  type: ADD_ITEM,
  payload: [item],
});

export const setItems = (items: Item[]): ItemActions => ({
  type: SET_ITEMS,
  payload: items,
});

export const updateItem = (items: Item[]): ItemActions => ({
  type: UPDATE_ITEM,
  payload: items,
});

export const removeItem = (items: Item[]): ItemActions => ({
  type: REMOVE_ITEM,
  payload: items,
});
