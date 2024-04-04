import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './startButton.css'

const StartButton = () => {


  const navigate = useNavigate();


  const handleClick = () => {
  
    navigate("/game");
  };

  return (
    <button onClick={handleClick} className="start-button">
      Start Game
    </button>
  );
};

export default StartButton;