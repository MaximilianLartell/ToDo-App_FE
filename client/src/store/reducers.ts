import { Reducer } from 'redux';
import {
  User,
  UserActions,
  SocketActions,
  SET_USER,
  CLEAR_USER,
  ADD_CREATED_LIST,
  REMOVE_LIST,
  SET_CREATED_LISTS,
  SET_CURRENT_LIST,
  NEW_SOCKET,
  DISCONNECT,
  ADD_ITEM,
  SET_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
  Socket,
  DefaultSocket,
  List,
  ListActions,
  CurrentList,
  CurrentListActions,
  ItemActions,
  Item,
} from '../types';

const defaultUser: User = {
  userId: '',
  userName: '',
  createdLists: [],
  subscribedLists: [],
  online: false,
};

const defaultLists: List[] = [];
const defaultItems: Item[] = [];

const defaultSocket = {
  connected: false,
  disconnected: true,
  id: undefined,
};

const defaultCurrentList: CurrentList = {
  listId: '',
  listName: '',
  creatorId: '',
  users: [],
  items: [],
  isCreator: true,
  subscribed: false,
  displayOpt: 'ALL',
};

export const itemsReducer: Reducer<Item[], ItemActions> = (
  state = defaultItems,
  { type, payload }
) => {
  switch (type) {
    case ADD_ITEM:
      return [...state, ...payload];
    case SET_ITEMS:
      return [...payload];
    case UPDATE_ITEM: {
      const newState = state.map((el) => {
        if (el.itemId === payload[0].itemId)
          return { ...el, done: payload[0].done };
        return el;
      });
      return newState;
    }
    case REMOVE_ITEM: {
      return state.filter((el) => el.itemId !== payload[0].itemId);
    }
    default:
      return state;
  }
};

export const currentListReducer: Reducer<CurrentList, CurrentListActions> = (
  state = defaultCurrentList,
  { type, payload }
) => {
  switch (type) {
    case SET_CURRENT_LIST:
      return payload;
    default:
      return state;
  }
};

export const userReducer: Reducer<User, UserActions> = (
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

export const createdListsReducer: Reducer<List[], ListActions> = (
  state = defaultLists,
  { type, payload }
) => {
  switch (type) {
    case ADD_CREATED_LIST:
      return [...state, ...payload];
    case SET_CREATED_LISTS:
      return [...payload];
    case REMOVE_LIST:
      console.log('removeList');
      return state.filter((el) => el.listId !== payload[0].listId);
    default:
      return state;
  }
};

export const socketReducer: Reducer<Socket | DefaultSocket, SocketActions> = (
  state = defaultSocket,
  { type, payload }
) => {
  switch (type) {
    case NEW_SOCKET:
      return payload;
    case DISCONNECT:
      return defaultSocket;
    default:
      return state;
  }
};
