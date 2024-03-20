import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authcontext';

const AuthenticatedLayout = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;