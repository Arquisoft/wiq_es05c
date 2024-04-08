import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './startButton.css'
//import { GameContext } from '../game/GameContext';
import { useTranslation } from 'react-i18next';

const StartButton = () => {


  const navigate = useNavigate();

  //para la internacionalización
  const {t} = useTranslation();

  const handleClick = () => {
  
    navigate("/game");
  };

  return (
    <button onClick={handleClick} className="start-button">
      {t('startButton')}
    </button>
  );
};

export default StartButton;