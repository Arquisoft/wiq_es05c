import React, { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import socket from './socket';
import Game  from '../game/Game';
import RoomGame from '../game/gameModes/RoomGame';
function Room({ darkMode }) {
  const nagivate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = location.state?.isHost;

  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);


  const [winner, setWinner] = useState(null);

  const [roomGame, setRoomGame] = useState(null);
  


  //para el mensaje del ganador 
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const onClose = () =>{
    setIsOpen(false);
    nagivate('/home');
  };
 
  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    console.log("eres el host "+isHost);


    socket.on('gameStarted', (questionsServer) => {
      console.log('Juego iniciado, preguntas recibidas : ', questionsServer);
     
      let room={
        getQuestions:questionsServer,
        winner:function (){
          return winner;
        },
        endGame:endGame,
      }
      setRoomGame(new RoomGame(room, nagivate));

      setGameStarted(true);
    });
    socket.on('gameEnded', ( winner ) => {
      console.log('Juego terminado, ganador: ', winner);
      setWinner(winner);
    });
    //limpiar el evento 
    return () => socket.off('gameEnded');
    

  }, [roomId]);


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
        socket.emit('startGame', { id: roomId });
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
      <h1>Sala: {roomId}</h1>
      <h2>Usuarios:</h2>
      <ul>
        {Object.keys(users).map((username, index) => (
            <li key={index}>{username}</li>
          ))}
      </ul>
      {isHost && <button onClick={startGame} disabled={gameStarted}>Iniciar Juego</button>}
      {gameStarted && roomGame!=null && <Game darkMode={darkMode} gameMode={roomGame} />}
    </div>
  );
}

export default Room;