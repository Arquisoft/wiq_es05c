import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext'; // Cambia AuthProvider a AuthContext
import './startButton.css'
const StartButton = () => {

  const navigate = useNavigate();



 // Verificar si el usuario está autenticado basándote en si hay un token en el localStorage
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  console.log(isLoggedIn); // Log the value of isLoggedIn


  const handleClick = () => {
    navigate(isLoggedIn ? "/game" : "/login");
  };

  return (
    <button onClick={handleClick} className="start-button">
      Start Game
    </button>
  );
};

export default StartButton;