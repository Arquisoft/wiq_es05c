import React from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Verificar si el usuario está autenticado basándote en si hay un token en el localStorage
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isLoggedIn ? (
          // Si el usuario está autenticado, no mostrar los botones de inicio de sesión y registro
          <Button color="inherit" component={Link} to="/logout">
            Cerrar sesión
          </Button>
        ) : (
          // Si el usuario no está autenticado, mostrar los botones de inicio de sesión y registro
          <>
            <Button color="inherit" component={Link} to="/addUser">
              Registrarse
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;