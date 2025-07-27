// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
   // baseURL: 'https://student-scholarship-ass-12.vercel.app', //  Replace with your backend URL
    baseURL: 'https://student-scholarship-ass-12.vercel.app', //  Replace with your backend URL
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