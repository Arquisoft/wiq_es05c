// AuthContext.js
//se encarga de manejar el estado de si un usuario esta logeado o no 
import React, { useState, createContext } from 'react';
//contexto para la app 
export const AuthContext = createContext();
//componente que maneja el incio de sesion 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};