import React, {useState,useEffect} from 'react';
import Navbar from './components/navbar/NavBar';
import AddUser from './components/adduser/AddUser';
import Login from './components/login/Login';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartButton from './components/startbutton/StartButton';
import Game from './components/game/Game';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { ChakraProvider } from "@chakra-ui/react";
import AuthenticatedLayout from './components/authenticationLayout';
import GuestLayout from './components/GuestLayout';
import Logout from './components/logout/Logout';
import History from './components/history/History';
import {BasicGameMode } from './components/game/gameModes/basicGameMode';
import {GameProvider} from './components/game/GameContext';
import PrincipalView from './components/principalView/PrincipalView';

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      console.log('dark mode');
    } else {
      document.body.classList.remove('dark-mode');
      console.log('light mode');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>
        <GameProvider gameMode={new BasicGameMode()}>

        <Routes>
          <Route path="/" element={<ChakraProvider><PrincipalView/></ChakraProvider>} />
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
              <ChakraProvider><Game darkMode={darkMode}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
           <Route path="/history" element={
            <AuthenticatedLayout>
              <History />
            </AuthenticatedLayout>
          } />
        </Routes>
        </GameProvider>

        <Footer darkMode={darkMode}/>
      </Router>
      </AuthProvider>

  );
};

export default App;