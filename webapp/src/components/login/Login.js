// src/components/Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

import { AuthContext } from '../authcontext';

import { useNavigate ,Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const Login = (darkMode) => {
  //hacer que el navbar guarde el contexo de si estas loggeado o no 
  //ademas metes en localStorage que es como una cookie , el usuario para poder sacar sus datos en historial etc 

  const navigate = useNavigate();

  const{handleLogin}=useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000'; 

  //para la internacionalización
  const {t} = useTranslation();

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt} = response.data;

      handleLogin(response.data.token,response.data.username);//pasasr el token que nos da el servidor 

      //meter en localstorage el ultimo partida 
      localStorage.setItem('lastDailyGame', response.data.lastDailyGame);
      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);    

      setOpenSnackbar(true);
      //ir a la url 
      navigate('/');
      console.log(loginSuccess); // Log the value of isLoggedIn after login
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  let backgroundColor = darkMode.darkMode ? '#001c17' : '#fef5c6';
  let text = darkMode.darkMode ? '#FCFAF0' : '#08313A';
  let buttonColor = darkMode.darkMode ? '#107869' : '#FFFFF5';

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}
    style={{ 
      padding: '2em',
      marginTop: '4rem', 
      backgroundColor: backgroundColor,
      marginBottom: '3em',
      border: "0.1em solid"+text,
      color: text
    }}>
      {loginSuccess ? (
        <div>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }} data-testid="welcome-message">
            {t('loginWelcomeMessage')} {username}
          </Typography>
          <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}
            data-testid="welcome-date"
          >
            {t('loginDate')} {new Date(createdAt).toLocaleDateString()}.
          </Typography>
        

        </div>
      ) : (
        <div>
          <Typography component="h1" variant="h5" >
            {t('loginMessage')}
          </Typography>
          <TextField data-testid="username"
            InputProps={{
              style: { color: text }, // Cambia 'red' al color que quieras
            }}
            InputLabelProps={{
              style: { color: text }, // Cambia 'red' al color que quieras
            }}
            FormHelperTextProps={{
              style: { color: text }, // Cambia el color del texto de ayuda
            }}
            name="username"
            margin="normal"
            fullWidth
            label={t('loginUsername')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
          data-testid="password"
          InputProps={{
            style: { color: text }, // Cambia 'red' al color que quieras
          }}
          InputLabelProps={{
            style: { color: text }, // Cambia 'red' al color que quieras
          }}
          FormHelperTextProps={{
            style: { color: text }, // Cambia el color del texto de ayuda
          }}
            name="password"
            margin="normal"
            fullWidth
            label={t('loginPassword')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Typography>
          <Link id="register" to="/adduser" style={{color: text}}>{t('loginToAddUser')}</Link>

            </Typography>
          <Button id="login" data-testid="login-button" variant="contained" color="primary" onClick={loginUser} 
          style={{ backgroundColor: buttonColor, color: text }}>
            {t('loginMessage')}
          </Button>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={t('loginSuccess')}  />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`}  data-testid="error-snackbar" id="errorMessage"/>

          )}
       
        </div>
      )}
    </Container>
);
};

export default Login;