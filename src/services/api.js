// import axios from 'axios';
// import { getToken } from '../utils/auth';

// const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000' });
// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
// export default API;


import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});


API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
