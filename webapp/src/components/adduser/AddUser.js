// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

const AddUser = (darkMode) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { email, username, password , passwordConfirm});
      setOpenSnackbar(true);

      //navegar hacia el loggin si fue correcto 
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  let backgroundColor = darkMode.darkMode ? '#001c17' : '#37BEB0';
  let text = darkMode.darkMode ? '#FCFAF0' : '#071815';
  let buttonColor = darkMode.darkMode ? '#107869' : '#A4E5E0';

  //para la internacionalización
  const {t} = useTranslation();

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
      <Typography component="h1" variant="h5">
        {t('addUser')}
      </Typography>
      <TextField
       InputProps={{
         style: { color: text }, // Cambia 'red' al color que quieras
       }}
       InputLabelProps={{
         style: { color: text }, // Cambia 'red' al color que quieras
       }}
       FormHelperTextProps={{
         style: { color: text }, // Cambia el color del texto de ayuda
       }}
        name="email"
        margin="normal"
        fullWidth
        label={t('email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
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
        label={t('userName')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
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
        label={t('password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText={t('passwordHelper')}
      />
      <TextField
       InputProps={{
         style: { color: text }, // Cambia 'red' al color que quieras
       }}
       InputLabelProps={{
         style: { color: text }, // Cambia 'red' al color que quieras
       }}
       FormHelperTextProps={{
         style: { color: text }, // Cambia el color del texto de ayuda
       }}
        name="passwordConfirm"
        margin="normal"
        fullWidth
        label={t('passRepeat')}
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        helperText={t('passwordRepeatHelper')}
      />
      <Button id="addRegister" variant="contained" color="primary" onClick={addUser}
      style={{ backgroundColor: buttonColor, color: text }}>
        {t('addUser')}
      </Button>
      <Snackbar id="addMessage" data-testid="addMessage" open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={t('addUserMessage')} />
      {error && (
        <Snackbar id="errorMessage" data-testid="errorMessage" open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
    </Container>
  );
};

export default AddUser;
