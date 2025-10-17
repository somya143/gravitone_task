import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true, // include cookies for refresh token
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ===== APIs =====
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const refreshToken = () => API.get('/auth/refresh');
export const logoutUser = () => API.post('/auth/logout');
