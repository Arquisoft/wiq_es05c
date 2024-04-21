import React, {useState,useEffect} from 'react';
import Navbar from './components/navbar/NavBar';
import AddUser from './components/adduser/AddUser';
import Login from './components/login/Login';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/game/Game';
import SameCategoryMode from './components/game/gameModes/SameCategoryMode';
import InfinityGameMode from './components/game/gameModes/InfinityGameMode';
import CustomGameMode from './components/game/gameModes/CustomGameMode';
import {CustomWindow} from './components/game/gameModes/CustomWindow';
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
import { Ranking } from './components/ranking/Ranking';
import RankingRoom from './components/rooms/RankingRoom'; // Asegúrate de que la ruta de importación es correcta
import BasicGame from './components/game/BasicGame';
import DailyGameMode from './components/game/gameModes/DailyGameMode';

const App = () => {

  const [darkMode, setDarkMode] = useState(false);
  // Para el custom mode
  const [timeToAnswer, setTime] = useState(20);
  const [nQuestions, setNQuestions] = useState(20);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const sameCatMode = new SameCategoryMode();
  const infinityMode = new InfinityGameMode();
  const dailyGameMode = new DailyGameMode();
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
              <ChakraProvider><Game darkMode={darkMode} gameMode={new BasicGame()}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
          <Route path="/gameSameCat" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game darkMode={darkMode} gameMode={sameCatMode}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
          <Route path="/gameCustom" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game darkMode={darkMode} gameMode={new CustomGameMode(timeToAnswer,nQuestions)}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
          <Route path="/customWindow" element={
            <AuthenticatedLayout>
              <ChakraProvider><CustomWindow darkMode={darkMode} setTime={setTime} setNQuestions={setNQuestions}/></ChakraProvider>
            </AuthenticatedLayout>
          } />
          <Route path="/gameInfinity" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game darkMode={darkMode} gameMode={infinityMode}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
           <Route path="/gameDiaria" element={
            <AuthenticatedLayout>
              <ChakraProvider><Game darkMode={darkMode} gameMode={dailyGameMode}/>  </ChakraProvider>
            </AuthenticatedLayout>
          } />
           <Route path="/history" element={
            <AuthenticatedLayout>
               <ChakraProvider><History darkMode={darkMode}/></ChakraProvider>
            </AuthenticatedLayout>
          } />
          <Route path="/ranking" element={
            <AuthenticatedLayout>
               <ChakraProvider><Ranking darkMode={darkMode}/></ChakraProvider>
            </AuthenticatedLayout>
          } />

          <Route path="/joinroom" element={<AuthenticatedLayout> <ChakraProvider> <JoinRoomForm /> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/createroom" element={<AuthenticatedLayout> <ChakraProvider><CreateRoomForm /> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/room/:roomId" element={<AuthenticatedLayout><ChakraProvider> <Room darkMode={darkMode}/> </ChakraProvider></AuthenticatedLayout>} />
          <Route path="/rankingroom/:roomId" element={<AuthenticatedLayout><ChakraProvider> <RankingRoom darkMode={darkMode}/> </ChakraProvider></AuthenticatedLayout>} />
        </Routes>
        <Footer darkMode={darkMode}/>
      </Router>
      </AuthProvider>

  );
};

export default App;