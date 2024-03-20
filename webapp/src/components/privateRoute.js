/*
componente que se encarga de que el usuario loggeado pueda accderde r atoda la app y el que no lo este se quede en /
*/
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../authcontext';

const PrivateRoute=({children,...rest})=>{
    const{isLoggedIn}=useContext(AuthContext);

    return (
        <Route {...rest}>
          {isLoggedIn() ? children : <Navigate to="/" />}
        </Route>
      );
};

export default PrivateRoute;