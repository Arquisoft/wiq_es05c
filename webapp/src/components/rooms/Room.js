import React, { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socket from './socket';
import Game  from '../game/Game';
import { useTranslation } from 'react-i18next';

import RoomGame from '../game/gameModes/RoomGame';
function Room({ darkMode }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = location.state?.isHost;

  const [users, setUsers] = useState({});
  const [gameStarted, setGameStarted] = useState(false);


  const [winner, setWinner] = useState(null);

  //para la internacionalización
  const {t, i18n} = useTranslation();
  const [roomGame, setRoomGame] = useState(null);
  
  //para el mensaje del ganador 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    //console.log("eres el host "+isHost);


    socket.on('gameStarted', (questionsServer) => {
      console.log('Juego iniciado, preguntas recibidas : ', questionsServer);
     
      let room={
        getQuestions:questionsServer,
        winner:function (){
          return winner;
        },
        endGame:endGame,
      }
      setRoomGame(new RoomGame(room, navigate));

      setGameStarted(true);
    });
    socket.on('gameEnded', (ranking) => {
      console.log('Juego terminado, ranking:', ranking);
  
    
      // Redirigir a los jugadores a la página de ranking
      navigate('/rankingroom/'+roomId,{ state: { ranking: ranking } });
    });
    

  }, [roomId,users,navigate,winner]);


  //se encagr ad e que cuando las preguntas esten cargadas crees el modo de juego 

  //muestra el ganador 
  useEffect(() => {
    if (winner) {
      setIsOpen(true);
    }
  }, [winner]);
  
  function startGame  (){
      if(!gameStarted && isHost ){
        setGameStarted(true);
        socket.emit('startGame', { id: roomId , idioma: i18n.language});
        console.log("se ha iniciado el juego");
      }
    
  }

 
  //funcion que le pasas a game para gestionar el finaldel juego 
  function endGame(results) {

    console.log("emitir endGame socket.io");
    socket.emit('endGame', {id:roomId, results:results});

  }
  //pasasrlelos datos al juego 
  
  




  return (
    <div>
      <h1>{t('room')}{roomId}</h1>
      <h2>{t('roomUsers')}</h2>
      <ul>
        {Object.keys(users).map((username, index) => (
            <li key={index}>{username}</li>
          ))}
      </ul>
      {isHost && <button onClick={startGame} disabled={gameStarted}>{t('roomStartGameButton')}</button>}
      {gameStarted && roomGame!=null && <Game darkMode={darkMode} gameMode={roomGame} />}
    </div>
  );
}

export default Room;