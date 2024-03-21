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
import {BasicGameMode } from './components/game/gameModes/basicGameMode';
import {GameProvider} from './components/game/GameContext';
import PrincipalView from './components/principalView/PrincipalView';
import Room from './components/rooms/Room'; // Importa el componente de sala
import CreateRoomForm from './components/rooms/CreateRoom'; // Importa el componente para crear sala
import JoinRoomForm from './components/rooms/JoinRoom'; // Importa el componente para unirse a sala
import GameMultiplayer from './components/game/GameMultiplayer'; // Importa el componente para el juego multijugador

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
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
              <ChakraProvider><Game />  </ChakraProvider>
            </AuthenticatedLayout>
          } />
           <Route path="/history" element={
            <AuthenticatedLayout>
              <History />
            </AuthenticatedLayout>
          } />

          <Route path="/joinroom" element={<AuthenticatedLayout><JoinRoomForm /></AuthenticatedLayout>} />
          <Route path="/createroom" element={<AuthenticatedLayout><CreateRoomForm /></AuthenticatedLayout>} />
          <Route path="/room/:roomId" element={<AuthenticatedLayout><ChakraProvider> <Room /> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/multiplayer" element={<AuthenticatedLayout><ChakraProvider > <GameMultiplayer /> </ChakraProvider></AuthenticatedLayout>} />
        </Routes>
        </GameProvider>

        <Footer/>
      </Router>
      </AuthProvider>

  );
};

export default App;