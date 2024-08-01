import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_USER_USRL = "http://localhost:3001/api/users/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    let success = false;
    const resource = await axios.post(`${API_USER_USRL}/login`, { username, password });
    console.log(resource);
    const response = resource.data.response
    if(response.success){
      const token = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
      success = true;
    } else {
      console.error("Error al gestiona login.");
      console.error(response.message);
    }
    return success;
  };

  const logout = async () => {
    const header = {
      headers: { 'Authorization': `Bearer ${user}` }
    }
    let success = false;
    try {
      const resource = await axios.post(`${API_USER_USRL}/logout`,header);
      const response = resource.data
      success = response.success
      if(!success){
        console.error("Error al gestiona login.");
        console.error(response.message);
      }
      return success
    } catch (error) {
      console.error("Error al gestiona logout.", error);
    } finally {
      // Limpia el usuario y el token localmente
      setUser(null);
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = '';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};