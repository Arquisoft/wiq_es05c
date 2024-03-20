// src/components/Login.js
import React, { useContext, useState ,useEffect} from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

import { AuthContext } from '../authcontext';

import { useNavigate } from 'react-router-dom';

const Login = () => {
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

  


  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt} = response.data;


      handleLogin(response.data.token,response.data.username);//pasasr el token que nos da el servidor 

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

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {loginSuccess ? (
        <div>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Hello {username}!
          </Typography>
          <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            Your account was created on {new Date(createdAt).toLocaleDateString()}.
          </Typography>
        

        </div>
      ) : (
        <div>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={loginUser}>
            Login
          </Button>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
       
        </div>
      )}
    </Container>
);
};

export default Login;