import axios from 'axios';

export const initAxiosInstance = () => {
  const axiosInstance = axios.create({
    // baseURL: 'https://notekeeper-bff.onrender.com/api/v1', // Replace with your API base URL
    baseURL: 'http://localhost:3000/api/v1', // Replace with your API base URL
    timeout: 10000, // Set timeout for requests
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: (() => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
      })()
    },
    withCredentials: true
  });

  return axiosInstance;
};
