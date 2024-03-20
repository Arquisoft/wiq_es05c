import React from 'react';
import { useEffect } from 'react';
import './Logout.css';
const Logout = () => {

    const handleLogout = () => {
        // Borrar el token del localStorage
        localStorage.removeItem('token');
    
       
      };
    // Llamar a handleLogout cuando se monta el componente

      useEffect(() => {
        handleLogout();
    }, []);


      return (
        <div className="logout-message">
            <h2>Gracias por jugar. ¡Vuelve pronto!</h2>
        </div>
    );

};

export default Logout;