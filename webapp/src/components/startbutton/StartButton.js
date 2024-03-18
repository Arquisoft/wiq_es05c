import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext'; // Cambia AuthProvider a AuthContext
import './startButton.css'
const StartButton = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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