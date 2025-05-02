// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';


const API_BASE = 'http://localhost:9999';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [menu, setMenu] = useState(() => {
    try {
      const storedMenu = localStorage.getItem('menu');
      return storedMenu ? JSON.parse(storedMenu) : [];
    } catch (e) {
      console.warn("Invalid menu data in localStorage", e);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user && accessToken) {
      fetchMenu();
    }
  }, [user]);
















  const fetchMenu = async () => {
    try {
      setMenu([]); 
      const data = await customFetch(`${API_BASE}/api/menu`);
      console.log("==================MENU=========", data);
      setMenu(data); 
      localStorage.setItem('menu', JSON.stringify(data)); 
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };
  

  const saveTokens = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));  
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user); 
    setIsAuthenticated(true);
  };



 

  const register = async ({ username, password, email, firstName, lastName, phone, address, city, state, zip, country }) => {
    setLoading(true);
  
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
          phone,
          address,
          city,
          state,
          zip,
          country
        }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  
  const login = async (username, password) => {

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      saveTokens(data);
      await  fetchMenu();
  
    
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err.message); 
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      if (!res.ok) return false;
      saveTokens({ accessToken: data.accessToken, refreshToken });
      return true;
    } catch {
      logout();
      return false;
    }finally {
      setLoading(false);
    }
  };

  const customFetch = async (endpoint, options = {}, retry = true) => {
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${endpoint}`, {
        ...options,
        headers,
      });

  
     
      if (response.status === 401 && retry) {
        console.warn("🔁 Token unauthorized (401) — trying to refresh...");
        const refreshed = await refreshAccessToken();
        if (refreshed){ 
          console.log("✅ Token refreshed, retrying request...");
          return customFetch(endpoint, options, false);
        }
        throw new Error('Session expired');
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || response.statusText);
      return data;
    } catch (err) {
      // console.error('Fetch failed ', err);
      // throw err;
      console.error('🚨 Redirecting to login due to fetch error:', err.message);
     // navigate('/login');
     throw err;
    
    }finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{loading , isAuthenticated, user, menu, fetchMenu,login, logout, register, customFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
