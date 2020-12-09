import PATH from '../config';
import { User, ErrorMessage, List, UserName, Item } from '../types';

export const fetchUser = (
  path: string,
  handleRes: (data: User | ErrorMessage) => void
): void => {
  fetch(`${PATH}${path}`)
    .then((res) => res.json())
    .then((data) => handleRes(data))
    .catch((err) => {
      console.log(err.message);
      sessionStorage.removeItem('userId');
    });
};

export const fetchLists = (
  path: string,
  handleRes: (data: List[]) => void
): void => {
  fetch(`${PATH}${path}`)
    .then((res) => res.json())
    .then((data) => handleRes(data))
    .catch((err) => {
      console.log(err.message);
    });
};

export const fetchItems = (
  path: string,
  handleRes: (data: Item[]) => void
): void => {
  fetch(`${PATH}${path}`)
    .then((res) => res.json())
    .then((data) => handleRes(data))
    .catch((err) => {
      console.log(err.message);
    });
};

export const postCredentials = (
  path: string,
  body: { userName: UserName; password: string },
  handleRes: (data: User | ErrorMessage) => void
): void => {
  fetch(`${PATH}${path}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => handleRes(data))
    .catch((e) => console.log(e));
};
