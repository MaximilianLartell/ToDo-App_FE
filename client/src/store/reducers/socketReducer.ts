import { Reducer } from 'redux';
import {
  SocketActions,
  NEW_SOCKET,
  DISCONNECT,
  Socket,
  DefaultSocket,
} from '../../types';

const defaultSocket = {
  connected: false,
  disconnected: true,
  id: undefined,
};

const socketReducer: Reducer<Socket | DefaultSocket, SocketActions> = (
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

export default socketReducer;
