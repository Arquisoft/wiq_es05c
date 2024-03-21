import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import GameMultiplayer from '../game/GameMultiplayer';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const [socket, setSocket] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = socketIOClient('http://localhost:8003'); // Reemplaza esto con la URL de tu servidor
    setSocket(newSocket);

    // Escuchar eventos del servidor
    newSocket.on('userJoined', (username) => {
      setUsers((users) => [...users, username]);
    });

    // Manejar evento cuando un usuario abandona la sala
    newSocket.on('userLeft', (username) => {
      setUsers((users) => users.filter((user) => user !== username));
    });

    return () => newSocket.close();
  }, []);

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
      {startGame && <GameMultiplayer />}
    </div>
  );
};

export default Room;
