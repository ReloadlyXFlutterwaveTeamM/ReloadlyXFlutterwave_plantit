import axios from 'axios';
// import { logOut } from './auth';

const SERVER_API = process.env.REACT_APP_SERVER_API;

const API = axios.create({
  baseURL: SERVER_API,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
});

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       logOut();

//       return Promise.reject();
//     }

//     return Promise.reject(error);
//   },
// );

export default API;
