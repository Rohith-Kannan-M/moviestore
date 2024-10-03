import axios from 'axios';
import { AUTHORIZATION_CODE } from '../constant';

const apiClient = axios.create({
  baseURL: process.env.NEXT_ROOT_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        console.log('hellloooo');
        config.headers.Authorization = `Bearer ${AUTHORIZATION_CODE}`;
        config.headers.accept = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
