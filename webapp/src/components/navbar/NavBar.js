import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem, Typography,ListItem, Switch } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authcontext';

const CustomSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'white', // Color del thumb cuando el switch está activado
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'white', // Color del track cuando el switch está activado
  },
  '& .MuiSwitch-switchBase': {
    color: 'black', // Color del thumb cuando el switch está desactivado
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'black', // Color del track cuando el switch está desactivado
  },
});

const NavBar = ({ setDarkMode }) => {
  const { isLoggedIn,username } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  console.log('isLoggedIn', isLoggedIn);
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <CustomSwitch onChange={handleToggle} />
        {isLoggedIn() ? (
         <>
         <IconButton onClick={handleClick}>
           <Avatar alt="User Avatar" src="/public/icon.jpg" />
         </IconButton>
         <Menu
           anchorEl={anchorEl}
           open={Boolean(anchorEl)}
           onClose={handleClose}
         >
           <ListItem button={false}>
             <Typography fontWeight="bold">{username}</Typography>
           </ListItem>
           <MenuItem onClick={handleClose} component={Link} to="/logout">
             Cerrar sesión
           </MenuItem>
           <MenuItem onClick={handleClose} component={Link} to="/history">
             Historial
           </MenuItem>
         </Menu>
       </>
        ) : (
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