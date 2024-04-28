import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // leer el token del localStorage
  const [username,setUsername]=useState(localStorage.getItem('username'));
  const [lastDailyGame,setLastDailyGame]=useState(localStorage.getItem('lastDailyGame'));

  const handleLogin = (jwtToken,username,lastDailyGame) => { // Modifica handleLogin para aceptar un token
    setToken(jwtToken); // Guarda el token en el estado
    setUsername(username); //almacena el username
    setLastDailyGame(lastDailyGame);
    localStorage.setItem('token', jwtToken); // Guarda el token en el localStorage
    localStorage.setItem('username',username);
    localStorage.setItem('lastDailyGame',lastDailyGame);
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