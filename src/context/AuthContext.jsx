import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';


const API_BASE = 'http://localhost:9999';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const useAuth = () => useContext(AuthContext);

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});
  
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// REQUEST interceptor (inject token)
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// RESPONSE interceptor (refresh logic)
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      return new Promise(function (resolve, reject) {
    
        axios.post(`${API_BASE}/api/refresh`, { refreshToken })  
          .then(({ data }) => {
            localStorage.setItem('accessToken', data.accessToken);
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.accessToken;
            processQueue(null, data.accessToken);
            originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
            resolve(axiosInstance(originalRequest));
          }).catch((err) => {
            processQueue(err, null);
            localStorage.clear();
             window.location.href = '/login';
             reject(err);
          }).finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);



function extractPermissions(menu) {
  const permissionsMap = {};
  menu.forEach(item => {
    // Use path as key if present, else label
    const key = item.path || item.label;
    permissionsMap[key] = item.permissions;
  });
  return permissionsMap;
}





export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem('user');
      return rawUser && rawUser !== 'undefined' ? JSON.parse(rawUser) : null;
    } catch (e) {
      console.warn(' Invalid user in localStorage:', e);
      return null;
    }
  });

  const [menu, setMenu] = useState(() => {
    try {
      const rawMenu = localStorage.getItem('menu');
      return rawMenu ? JSON.parse(rawMenu) : [];
    } catch (e) {
      console.warn(' Invalid menu in localStorage:', e);
      return [];
    }
  });


const [permissions, setPermissions] = useState(() => {
  try {
    const rawMenu = localStorage.getItem('menu');
    const menuData = rawMenu ? JSON.parse(rawMenu) : [];
    return extractPermissions(menuData);
  } catch (e) {
    console.warn('Failed to extract permissions:', e);
    return {};
  }
});









  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const saveTokens = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', user ? JSON.stringify(user) : 'null');

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setMenu([]);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const customFetch = async (endpoint, options = {}, retry = true) => {
  setLoading(true);
  try {
    const method = (options.method || 'get').toLowerCase();
    const config = {
      url: endpoint,
      method,
      headers: options.headers || {},
    };
   if (options.body) config.data = options.body;
    const response = await axiosInstance(config);
    return response.data;
  } catch (err) {
    console.error('Axios error:', err.message);
    if (!retry) logout();
    throw err;
  } finally {
    setLoading(false);
  }
};




  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/token`, { username, password });
      saveTokens(res.data);
      await fetchMenu();
      return { success: true };
    } catch (err) {
      console.error(' Login failed:', err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (details) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/register`, details);


          console.log("data reeibved after register  res  " ,res);

          console.log("data reeibved after register   res data " ,res.data);





      saveTokens(res.data);
      await fetchMenu();
      return { success: true };
    } catch (err) {
      console.error(' Registration failed:', err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };



const updateMenu = (newMenu) => {
  setMenu(newMenu);
  setPermissions(extractPermissions(newMenu));
  localStorage.setItem('menu', JSON.stringify(newMenu));
};









  // const fetchMenu = async () => {
  //   try {
  //     const data = await customFetch('/api/menu');
  //     setMenu(data);
  //     localStorage.setItem('menu', JSON.stringify(data));
  //   } catch (err) {
  //     console.error(' Failed to fetch menu:', err.message);
  //   }
  // };




const fetchMenu = async () => {
  try {
    const data = await customFetch('/api/menu');
    updateMenu(data);
  } catch (err) {
    console.error('Failed to fetch menu:', err.message);
  }
};




const hasPermission = (label, permissionType) => {
  if (!menu || !Array.isArray(menu)) return false;

  // Find the menu item by its label
  const menuItem = menu.find(item => item.label === label);

  // If item or permissions not found, return false
  if (!menuItem || !menuItem.permissions) return false;

  // Return true if permissionType is true, else false
  return Boolean(menuItem.permissions[permissionType]);
};







  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isAuthenticated,
        user,
        menu,
        fetchMenu,
        login,
        logout,
        register,
        customFetch,
        axiosInstance,
        permissions,
        hasPermission,
        saveTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};