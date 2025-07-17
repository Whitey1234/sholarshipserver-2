// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', //  Replace with your backend URL
    withCredentials: true, // for cookies if needed
  });

  useEffect(() => {
    // Automatically attach token from localStorage
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;