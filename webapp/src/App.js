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
import GuestLayout from './components/GuestLayout';
import Logout from './components/logout/Logout';
import History from './components/history/History';
import {BasicGameMode } from './components/game/gameModes/BasicGameMode';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartButton/>} />
          <Route path="/login" element={ <GuestLayout> <Login /> </GuestLayout>} />
          <Route path="/adduser" element={<GuestLayout> <AddUser /> </GuestLayout>}  />
          <Route path="/logout" element={  <AuthenticatedLayout> <Logout /> </AuthenticatedLayout>} />

          <Route path="/home" element={
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          } />
          <Route path="/game" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game gameMode={new BasicGameMode()}/></ChakraProvider>
            </AuthenticatedLayout>
          } />
           <Route path="/history" element={
            <AuthenticatedLayout>
              <History />
            </AuthenticatedLayout>
          } />
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>

  );
};

export default App;