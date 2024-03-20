import React from 'react';
import Navbar from './components/navbar/NavBar';
import AddUser from './components/adduser/AddUser';
import Login from './components/login/Login';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartButton from './components/startbutton/StartButton';
import Game from './components/game/Game';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { ChakraProvider } from '@chakra-ui/react';

import AuthenticatedLayout from './components/authenticationLayout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartButton isLoggedIn={true} />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
         

          <Route path="/home" element={
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          } />
          <Route path="/game" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game /></ChakraProvider>
            </AuthenticatedLayout>
          } />
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>

  );
};

export default App;