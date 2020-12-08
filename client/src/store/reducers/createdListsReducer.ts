import { Reducer } from 'redux';
import {
  List,
  ListActions,
  SET_CREATED_LISTS,
  ADD_CREATED_LIST,
  REMOVE_LIST,
} from '../../types';

const defaultLists: List[] = [];

const createdListsReducer: Reducer<List[], ListActions> = (
  state = defaultLists,
  { type, payload }
) => {
  switch (type) {
    case ADD_CREATED_LIST:
      return [...state, ...payload];
    case SET_CREATED_LISTS:
      return [...payload];
    case REMOVE_LIST:
      return state.filter((el) => el.listId !== payload[0].listId);
    default:
      return state;
  }
};

export default createdListsReducer;
