import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authcontext';
const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);


  console.log('isLoggedIn', isLoggedIn);
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isLoggedIn() ? (
          // Si el usuario está autenticado, mostrar el botón de "Cerrar sesión"
          <>
          <Button color="inherit" component={Link} to="/logout">
            Cerrar sesión
          </Button>
          
          <Button color="inherit" component={Link} to="/history">
            Historial
          </Button>
          </>
        ) : (
          // Si el usuario no está autenticado, mostrar los botones de "Iniciar sesión" y "Registrarse"
          <>
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
            <Button color="inherit" component={Link} to="/adduser">
              Registrarse
            </Button>
           
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;