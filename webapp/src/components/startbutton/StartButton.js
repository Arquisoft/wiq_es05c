import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './startButton.css'
import { GameContext } from '../game/GameContext';
const StartButton = () => {

  const { startGame, questions, isLoading } = useContext(GameContext);

  const navigate = useNavigate();


  const handleClick = () => {
    startGame();//llamar a la funcion empezar juego 
    navigate("/game");
  };

  return (
    <button onClick={handleClick} className="start-button">
      Start Game
    </button>
  );
};

export default StartButton;