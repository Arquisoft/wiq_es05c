import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authcontext';
/*
maneja la logica de autenticacion yu rendenriza los hijos 
*/
const AuthenticatedLayout = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;