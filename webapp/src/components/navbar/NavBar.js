import React, { useContext, useState } from 'react';
import { Divider, AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem, Typography,ListItem, ListItemIcon , Switch } from '@mui/material';
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
    const tradToBlock = document.getElementById('change-language-button');
    if (tradToBlock && tradToBlock.getAttribute('inGame') === 'true') {
      console.log('En juego no puedes cambiar de idioma');
    } else {
      setAnchorLanguage(event.currentTarget);
    }
  };

  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };

  const handleMenuClick = () => {
    handleClose();
    blockComponent(0,'dark-mode-switch', false);
    blockComponent(1,'change-language-button', false);
  };

  const handleNavPagesClick = () => {
    blockComponent(0,'dark-mode-switch', false);
    blockComponent(1,'change-language-button', false);
  };


  //Paso el id y un booleano true si queremos que quede bloqueado o false para desbloquear (disabled solo funciona para inputs creo)
  //El tipo es porque necesito diferente comportamiento entre el switch que es input y el button
  const blockComponent = (typeComponent,componentId, putBlocked)=>{
    switch(typeComponent){
      case 0://Switch oscuro claro
        // Esto para desbloquear el darkMode
        const switchToBlock = document.getElementById('dark-mode-switch');
        //Si existe el componente lo deshabilita
        if (switchToBlock) {
          switchToBlock.disabled = putBlocked;
        }
        break;
      case 1://Traductor
        const tradToBlock = document.getElementById('change-language-button');
        if (tradToBlock) {
          tradToBlock.setAttribute('inGame', putBlocked);
        }
        break;
      default:
        console.log('No se ha pasado un tipo de componente correcto');
        break;
      }
    };

  console.log('isLoggedIn', isLoggedIn);
  return (
    <AppBar position="static" style={{ backgroundColor: barBackgroundColor, color: textColor,  borderBottom: '0.1em solid' + textColor}} id="navbar" data-testid="navbar" >
      <Toolbar>
        <Button color="inherit" component={Link} to="/home"
        onClick={()=>handleNavPagesClick()} data-testid="homeButton"
        >
          {t('home')}
        </Button>
           
        <Button color="inherit" component={Link} to="/joinroom"
        onClick={()=>handleNavPagesClick()} id="roomJoinButton" data-testid="roomJoinButton"
        >
          {t('roomJoinButton')}
        </Button>
        <Button color="inherit" component={Link} to="/createroom"
        onClick={()=>handleNavPagesClick()} id="roomCreateButton" data-testid="roomCreateButton"
        >
          {t('roomCreateButton')}
        </Button>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

        <IconButton id='change-language-button' onClick={handleClickLanguage}>
          <LanguageIcon color={darkMode ? "primary" : "action"} />
          <Typography id="idioma" data-testid="idioma" color={darkMode ? "primary" : "action"} >{i18n.language.toUpperCase()} </Typography>
        </IconButton>
        <Menu
          anchorEl={anchorLanguage}
          open={Boolean(anchorLanguage)}
          onClose={handleCloseLanguage}
        >
          <MenuItem onClick={() => changeLanguage('es')} id="spanish-menu-item" data-testid="spanish-menu-item">
            <ListItemIcon data-testid="spanish-flag">
              <img src="/spain_flag.png" alt={t('spanishFlag')} />
            </ListItemIcon> 
            {t('spanish')}</MenuItem>
          <MenuItem onClick={() => changeLanguage('en')} id="english-menu-item" data-testid="english-menu-item" >
          <ListItemIcon data-testid="english-flag">
            <img src="/uk_flag.png" alt={t('englishFlag')} />
          </ListItemIcon>            
            {t('english')}</MenuItem>
        </Menu>

        <CustomSwitch id='dark-mode-switch' onChange={handleToggle} />
        {isLoggedIn() ? (
         <>
         <IconButton onClick={handleClick} id="iconoUsuario" data-testid="iconoUsuario">
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
           <Divider orientation="horizontal" flexItem />
           <MenuItem onClick={handleMenuClick} component={Link} to="/history" id="historyButton" data-testid="historyButton">
             {t('history')}
           </MenuItem>
           <MenuItem onClick={handleMenuClick} component={Link} to="/ranking" id="rankingButton" data-testid="rankingButton">
             {t('ranking')}
           </MenuItem>
           <Divider orientation="horizontal" flexItem />
           <MenuItem onClick={handleMenuClick} component={Link} to="/logout" id="logoutButton" data-testid="logoutButton">
            {t('logout')}
           </MenuItem>
       
         </Menu>
       </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" id="loginButton" data-testid="loginButton">
              {t('signIn')}
            </Button>
            <Button color="inherit" component={Link} to="/adduser" data-testid="addButton">
              {t('signUp')}
            </Button>
          </>
         
        )}

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;