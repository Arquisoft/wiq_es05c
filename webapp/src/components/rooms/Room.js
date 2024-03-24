import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import GameMultiplayer from '../game/GameMultiplayer';
import { useParams } from 'react-router-dom';
const socket = socketIOClient('http://localhost:8005'); // Reemplazar esto por algo no hardcoded
const Room = () => {
  const { roomId } = useParams();
  const [startGame, setStartGame] = useState(false);
  const [users, setUsers] = useState([]);

  /*
indica que la vista esta lista 
  */

  useEffect(() => {
  


     // Emitir evento 'ready' después de registrarse para escuchar 'currentUsers'
    socket.emit('ready',{id:roomId});


  
  }, []);

  useEffect(() => {
    console.log('Usuarios actuales: (Estado)', users);
  }, [users]);

  // Función para iniciar el juego
  const handleStartGame = () => {
    setStartGame(true);
    // Aquí puedes emitir un evento al servidor para iniciar el juego si es necesario
  };

  return (
    <div>
      <h2>Sala: {roomId}</h2>
      <button onClick={handleStartGame}>Iniciar juego</button>
      <p>Usuarios: {users.join(', ')}</p>
      <ul>
      {users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
      {startGame && <GameMultiplayer />}
    </div>
  );
};

export default Room;
