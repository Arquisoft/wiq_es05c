import React , { useContext,useEffect }from 'react';

import './Logout.css';
import { AuthContext } from '../authcontext';
const Logout = () => {
  const { logout } = useContext(AuthContext);

    
  useEffect(() => {
    logout();
  }, []);
    // Llamar a handleLogout cuando se monta el componente

      return (
        <div className="logout-message">
            <h2>Gracias por jugar. ¡Vuelve pronto!</h2>
        </div>
    );

};

export default Logout;