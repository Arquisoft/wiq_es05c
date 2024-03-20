import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')); // leer el token del localStorage

  const handleLogin = (jwtToken) => { // Modifica handleLogin para aceptar un token
    setIsLoggedIn(true);
    setToken(jwtToken); // Guarda el token en el estado
    localstorage.setItem('token', jwtToken); // Guarda el token en el localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};