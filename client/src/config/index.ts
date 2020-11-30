export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PATH =
  NODE_ENV === 'development' ? 'http://localhost:8000' : 'some heroku adress';
