/*
permitiria el acceso solamente  a usuarios no logeados usado para evitar que alguien logeado pueda acceder a la pagina del loggin 
*/

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authcontext';

const GuestOnlyRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;