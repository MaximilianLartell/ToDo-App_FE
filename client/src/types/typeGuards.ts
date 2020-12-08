import { Socket, DefaultSocket, ErrorMessage, User, List } from './index';

export const isSocket = (input: Socket | DefaultSocket): input is Socket => {
  return (input as Socket).id !== undefined;
};

type InputOptions = User | List | List[] | ErrorMessage | undefined;
export const isUser = (input: InputOptions): input is User => {
  return (input as User).userId !== undefined;
};

export const isList = (input: InputOptions): input is List => {
  return (input as List).listId !== undefined;
};

export const isError = (input: InputOptions): input is ErrorMessage => {
  return (input as ErrorMessage).type === 'Error';
};
