import { Reducer } from 'redux';
import {
  ItemActions,
  Item,
  ADD_ITEM,
  SET_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
} from '../../types';

const defaultItems: Item[] = [];

const itemsReducer: Reducer<Item[], ItemActions> = (
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

export default itemsReducer;
