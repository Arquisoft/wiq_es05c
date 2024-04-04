import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem, Typography,ListItem, ListItemIcon , Switch } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authcontext';

//para la internacionalización
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

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

const NavBar = ({ setDarkMode, darkMode}) => {
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

  console.log('darkMode naav', darkMode);
  let barBackgroundColor = darkMode?"#001c17" : "#fef5c6";
  let textColor = darkMode?"#FCFAF0" : "#08313A";

  //para la internacionalización
  const { t, i18n } = useTranslation();
  const [anchorLanguage, setAnchorLanguage] = useState(null);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    handleCloseLanguage(); 
  };
  
  const handleClickLanguage = (event) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };


  console.log('isLoggedIn', isLoggedIn);
  return (
    <AppBar position="static" style={{ backgroundColor: barBackgroundColor, color: textColor,  borderBottom: '0.1em solid' + textColor}}  >
      <Toolbar>
        <Button color="inherit" component={Link} to="/home">
          {t('home')}
        </Button>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleClickLanguage}>
          <LanguageIcon />
          <Typography>{i18n.language.toUpperCase()}</Typography>
        </IconButton>
        <Menu
          anchorEl={anchorLanguage}
          open={Boolean(anchorLanguage)}
          onClose={handleCloseLanguage}
        >
          <MenuItem onClick={() => changeLanguage('es')}>
            <ListItemIcon>
              <img src="/spain_flag.png" alt={t('spanishFlag')} />
            </ListItemIcon> 
            {t('spanish')}</MenuItem>
          <MenuItem onClick={() => changeLanguage('en')} startIcon={<img src="/public/uk_flag.png" alt="Spanish Flag" />}>
          <ListItemIcon>
            <img src="/uk_flag.png" alt={t('englishFlag')} />
          </ListItemIcon>            
            {t('english')}</MenuItem>
        </Menu>

        <CustomSwitch onChange={handleToggle} />
        {isLoggedIn() ? (
         <>
         <IconButton onClick={handleClick}>
           <Avatar alt="User Avatar" src="/icon.jpg" />
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
            {t('logout')}
           </MenuItem>
           <MenuItem onClick={handleClose} component={Link} to="/history">
             {t('history')}
           </MenuItem>
         </Menu>
       </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              {t('signIn')}
            </Button>
            <Button color="inherit" component={Link} to="/adduser">
              {t('signUp')}
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;