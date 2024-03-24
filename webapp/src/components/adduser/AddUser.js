// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { username, password , passwordConfirm});
      setOpenSnackbar(true);

      
      //navegar hacia el loggin si fue correcto 
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Añadir usuario
      </Typography>
      <TextField
        name="username"
        margin="normal"
        fullWidth
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        name="password"
        margin="normal"
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="La contraseña tiene que tener al menos 12 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial"
      />
      <TextField
        name="passwordConfirm"
        margin="normal"
        fullWidth
        label="Confirme la contraseña"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        helperText="Las contraseñas tienen que coincidir"
      />
      <Button variant="contained" color="primary" onClick={addUser}>
        Añadir usuario
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="User added successfully" />
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
    </Container>
  );
};

export default AddUser;
