import { Reducer } from 'redux';
import { CurrentList, CurrentListActions, SET_CURRENT_LIST } from '../../types';

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

const currentListReducer: Reducer<CurrentList, CurrentListActions> = (
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

export default currentListReducer;
