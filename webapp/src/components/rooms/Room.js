import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import socket from './socket';
function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.emit('ready', { id: roomId });

    socket.on('currentUsers', (users) => {
      console.log('Usuarios actuales: ', users);
      setUsers(users);
    });

    return () => {
      socket.off('currentUsers');
    };
  }, [roomId]);
  return (
    <div>
      <h1>Sala: {roomId}</h1>
      <h2>Usuarios:</h2>
      <ul>
        {Object.keys(users).map((username, index) => (
            <li key={index}>{username}</li>
          ))}
      </ul>
    </div>
  );
}

export default Room;