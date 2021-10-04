import axios from 'axios';

const SERVER_API = process.env.REACT_APP_SERVER_API;

const API = axios.create({
  baseURL: SERVER_API,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
});

export default API;
