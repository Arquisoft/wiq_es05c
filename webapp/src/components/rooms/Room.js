import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import socket from './socket';
function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });
    socket.emit('ready', { id: roomId });

    socket.on('gameStarted', (questions) => {
      console.log('Juego iniciado, preguntas: ', questions);
      setQuestions(questions);
    });


  }, [roomId]);

  
  const startGame = () => {
    console.log('Emitiendo evento startGame');

    socket.emit('startGame', { id: roomId });
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
      <button onClick={startGame}>Iniciar Juego</button>

    </div>
  );
}

export default Room;