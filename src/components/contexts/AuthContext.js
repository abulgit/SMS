import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You might want to verify the token with the server here
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Add this interceptor to include the token in all requests
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
