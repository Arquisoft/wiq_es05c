import React from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/addUser">
              Registrarse
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleClick}>
              <i className="fas fa-user"></i>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>{username}</MenuItem>
              <MenuItem component={Link} to="/logout" onClick={handleClose}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;