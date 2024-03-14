import React from 'react';
import { AuthProvider } from './components/authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/NavBar';
import AddUser from './components/authorise/AddUser';
import Login from './components/authorise/Login';
import Game from './components/game/Game';
import StartButton from './components/game/start/StartButton'
import Home from './components/game/home/Home'
import Footer from './components/game/footer/Footer'



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartButton isLoggedIn={true} />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
