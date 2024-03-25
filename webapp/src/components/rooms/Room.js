import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import socket from './socket';
import { QuestionArea } from '../game/QuestionArea';

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const isHost = location.state?.isHost;

  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);


  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    console.log("eres el host "+isHost);


  }, [roomId]);

  
  function startGame  (){

      if(!gameStarted && isHost){
        setGameStarted(true);
        socket.emit('startGame', { id: roomId });
      }
        socket.on('gameStarted', (questions) => {
          //hace la peticion por la preguntas a la gateway y se las manda los jugadores 
          console.log('Juego iniciado, preguntas: ', questions);
          setQuestions(questions);
        });

        console.log('Emitiendo evento startGame');

       
    
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
      {gameStarted && <QuestionArea questions={questions} />}


    </div>
  );
}

export default Room;