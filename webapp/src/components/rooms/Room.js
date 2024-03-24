import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import GameMultiplayer from '../game/GameMultiplayer';
import { useParams } from 'react-router-dom';
const socket = socketIOClient('http://localhost:8005'); // Reemplazar esto por algo no hardcoded

function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState('');

  useEffect(() => {
    // Emitir evento 'ready' después de registrarse para escuchar 'currentUsers'
    socket.emit('ready',{id:roomId});

    // Registrar el oyente para 'currentUsers'
    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: (Estado)', users);
      setUsers(users);
    });

    // Limpiar el oyente cuando se desmonte el componente
    return () => {
      socket.off('currentUsers');
    };
  }, []);

  return (
    <div>
      <h1>Sala: {roomId}</h1>
      <p>Usuarios: {users}</p>
    </div>
  );
}

export default Room;