import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box} from "@chakra-ui/react";
import { QuestionArea } from './components/QuestionArea';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  //  /**
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t,#08313A,#107869)"
      display="flex" justifyContent="center" alignItems="center">
        <QuestionArea/>
      </Box>
    </>
  );
  // */
  /**
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: 2 }}>
        {showLogin ? (
          <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
            Don't have an account? Register here.
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={handleToggleView}>
            Already have an account? Login here.
          </Link>
        )}
      </Typography>
    </Container>
  );
  */
}

export default App;
