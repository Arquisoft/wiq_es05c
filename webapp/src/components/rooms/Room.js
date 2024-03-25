import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import socket from './socket';
function Room() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);

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
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;