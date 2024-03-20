import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // leer el token del localStorage


  const handleLogin = (jwtToken) => { // Modifica handleLogin para aceptar un token
    setToken(jwtToken); // Guarda el token en el estado
    localStorage.setItem('token', jwtToken); // Guarda el token en el localStorage
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isLoggedIn = () => !!token; // devuelve true si estas logeado 

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin,logout }}>
      {children}
    </AuthContext.Provider>
  );
};