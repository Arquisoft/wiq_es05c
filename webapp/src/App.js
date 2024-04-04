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
import { ChakraProvider } from '@chakra-ui/react';
import AuthenticatedLayout from './components/authenticationLayout';
import GuestLayout from './components/GuestLayout';
import Logout from './components/logout/Logout';
import {History} from './components/history/History';
import PrincipalView from './components/principalView/PrincipalView';
import Room from './components/rooms/Room'; // Importa el componente de sala
import CreateRoomForm from './components/rooms/CreateRoom'; // Importa el componente para crear sala
import JoinRoomForm from './components/rooms/JoinRoom'; // Importa el componente para unirse a sala


const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>
       

        <Routes>
          <Route path="/" element={<ChakraProvider><PrincipalView darkMode={darkMode}/></ChakraProvider>} />
          <Route path="/login" element={ <GuestLayout> <Login darkMode={darkMode}/> </GuestLayout>} />
          <Route path="/adduser" element={<GuestLayout> <AddUser darkMode={darkMode}/> </GuestLayout>}  />
          <Route path="/logout" element={  <AuthenticatedLayout> <Logout darkMode={darkMode}/> </AuthenticatedLayout>} />

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
               <ChakraProvider><History darkMode={darkMode}/></ChakraProvider>
            </AuthenticatedLayout>
          } />

          <Route path="/joinroom" element={<AuthenticatedLayout> <ChakraProvider> <JoinRoomForm /> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/createroom" element={<AuthenticatedLayout> <ChakraProvider><CreateRoomForm /> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/room/:roomId" element={<AuthenticatedLayout><ChakraProvider> <Room darkMode={darkMode}/> </ChakraProvider></AuthenticatedLayout>} />
          
        </Routes>
        

        <Footer darkMode={darkMode}/>
      </Router>
      </AuthProvider>

  );
};

export default App;