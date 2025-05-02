// ../hooks/useAxios.js
import { useCallback } from 'react';
import axios from 'axios';

// ✅ Base Axios instance
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:1111/securityservice/api').replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ The custom hook
const useAxios = () => {
  // GET
  const getRequest = useCallback((url, params = {}) => {
    return api.get(url, { params });
  }, []);

  // POST
  const postRequest = useCallback((url, body = {}) => {
    return api.post(url, body);
  }, []);

  // PUT
  const putRequest = useCallback((url, body = {}) => {
    return api.put(url, body);
  }, []);

  // DELETE
  const deleteRequest = useCallback((url, params = {}) => {
    return api.delete(url, { params });
  }, []);

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
  };
};

export default useAxios;
