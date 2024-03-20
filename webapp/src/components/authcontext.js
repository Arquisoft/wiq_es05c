import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // leer el token del localStorage
  const [username,setUsername]=useState(localStorage.getItem('username'));

  const handleLogin = (jwtToken,username) => { // Modifica handleLogin para aceptar un token
    setToken(jwtToken); // Guarda el token en el estado
    localStorage.setItem('token', jwtToken); // Guarda el token en el localStorage
    localStorage.setItem('username',username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  const isLoggedIn = () => !!token; // devuelve true si estas logeado 

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin,logout,username}}>
      {children}
    </AuthContext.Provider>
  );
};