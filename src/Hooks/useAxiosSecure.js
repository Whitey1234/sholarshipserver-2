import axios from 'axios';

const axiosSecure = axios.create({
  // baseURL: 'https://student-scholarship-ass-12.vercel.app', 
  baseURL: 'https://student-scholarship-ass-12.vercel.app', 
  withCredentials: true,
});

// ✅ Intercept requests to add the Authorization token
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosSecure;
