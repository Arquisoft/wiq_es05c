import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";

import socket from './socket';
import Game  from '../game/GameMultiplayer';

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = location.state?.isHost;

  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);


  const [winner, setWinner] = useState(null);

  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    console.log("eres el host "+isHost);


    socket.on('gameStarted', (questions) => {
      //hace la peticion por la preguntas a la gateway y se las manda los jugadores 
      console.log('Juego iniciado, preguntas: ', questions);
      const formated =Object.values(questions);
      setQuestions(formated);
      setGameStarted(true);
    });

    socket.on('gameEnded', ({ winner }) => {
      setWinner(winner);
    });
    //limpiar el evento 
    return () => socket.off('gameEnded');
    

  }, [roomId]);

  
  function startGame  (){

      if(!gameStarted && isHost){
        //setGameStarted(true);
        socket.emit('startGame', { id: roomId });
        console.log("se ha iniciado el juego");
      }
     

      
    
  }
  //funcion que le pasas a game para gestionar el finaldel juego 
  function endGame(results) {
    socket.emit('endGame', {id:roomId, results:results});

  }

  

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
      {gameStarted && questions.length > 0 && <Game questions={questions} endGame={endGame} />}
      {winner && <p>EL ganador es {winner}</p>}
    </div>
  );
}

export default Room;