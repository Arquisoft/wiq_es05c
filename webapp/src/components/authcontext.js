import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // Nuevo estado para el token

  const handleLogin = (jwtToken) => { // Modifica handleLogin para aceptar un token
    setIsLoggedIn(true);
    setToken(jwtToken); // Guarda el token en el estado
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};