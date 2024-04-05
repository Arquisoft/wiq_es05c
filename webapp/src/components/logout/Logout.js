import React , { useContext,useEffect }from 'react';

import './Logout.css';
import { AuthContext } from '../authcontext';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  
  //para la internacionalización
  const {t} = useTranslation();
    
  useEffect(() => {
    logout();
  }, []);
    // Llamar a handleLogout cuando se monta el componente

      return (
        <div className="logout-message">
            <h2>{t('logoutMessage')}</h2>
        </div>
    );

};

export default Logout;