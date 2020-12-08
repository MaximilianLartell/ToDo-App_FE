import rootReducer from '../store/reducers';

export type UserId = string;
export type ListId = string;
export type ItemId = string;
export type UserName = string;
type ListName = string;
type Description = string;

export interface User {
  readonly userId: UserId;
  userName: UserName;
  createdLists: ListId[];
  subscribedLists: ListId[];
  online: boolean;
}

export interface List {
  readonly listId: ListId;
  listName: ListName;
  readonly creatorId: UserId;
  users: UserId[];
  items: ItemId[];
}

export interface CurrentList extends List {
  isCreator: boolean;
  subscribed: boolean;
  displayOpt: string;
}

export interface Item {
  readonly itemId: ItemId;
  readonly creatorId: UserId;
  description: Description;
  listId: ListId;
  done: boolean;
}

export interface ErrorMessage {
  type: 'Error';
  message: string;
}

export type Socket = SocketIOClient.Socket;
export type DefaultSocket = {
  id: string | undefined;
  connected: boolean;
  disconnected: boolean;
};

export enum Events {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CREATE_USER = 'create_user',
  SIGN_IN = 'sign_in',
  SIGN_OUT = 'sign_out',
  CREATE_LIST = 'create_list',
  JOIN_LIST = 'join_list',
  REMOVE_LIST = 'remove_list',
  NEW_ITEM = 'new_item',
  REMOVE_ITEM = 'remove_item',
  TOGGLE_DONE = 'toggle_done',
}

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const ADD_CREATED_LIST = 'ADD_CREATED_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const SET_CREATED_LISTS = 'SET_CREATED_LISTS';
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
export const SET_ITEMS = 'SET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const CLEAR_LISTS = 'CLEAR_LISTS';
export const NEW_SOCKET = 'NEW_SOCKET';
export const DISCONNECT = 'DISCONNECT';

export interface SetUser {
  type: typeof SET_USER;
  payload: User;
}

export interface ClearUser {
  type: typeof CLEAR_USER;
  payload: User;
}

export interface AddCreatedList {
  type: typeof ADD_CREATED_LIST;
  payload: List[];
}

export interface RemoveList {
  type: typeof REMOVE_LIST;
  payload: List[];
}

export interface SetCreatedLists {
  type: typeof SET_CREATED_LISTS;
  payload: List[];
}

export interface SetItems {
  type: typeof SET_ITEMS;
  payload: Item[];
}

export interface AddItem {
  type: typeof ADD_ITEM;
  payload: Item[];
}

export interface UpdateItem {
  type: typeof UPDATE_ITEM;
  payload: Item[];
}

export interface RemoveItem {
  type: typeof REMOVE_ITEM;
  payload: Item[];
}

export type NewSocket = {
  type: typeof NEW_SOCKET;
  payload: Socket;
};

export type DisconnectSocket = {
  type: typeof DISCONNECT;
  payload: DefaultSocket;
};

export interface SetCurrentList {
  type: typeof SET_CURRENT_LIST;
  payload: CurrentList;
}

export type UserActions = SetUser | ClearUser;

export type ListActions = AddCreatedList | SetCreatedLists | RemoveList;

export type CurrentListActions = SetCurrentList;

export type ItemActions = AddItem | SetItems | UpdateItem | RemoveItem;

export type SocketActions = NewSocket | DisconnectSocket;

export type RootState = ReturnType<typeof rootReducer>;
