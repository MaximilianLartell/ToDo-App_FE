const localPath = 'http://localhost:8000';
const externalPath = 'https://maximilian-reminder.herokuapp.com';

const PATH = process.env.NODE_ENV === 'production' ? externalPath : localPath;

export default PATH;
