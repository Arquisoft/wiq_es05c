import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:8005'); // Reemplazar esto por algo no hardcoded

const JoinRoomForm = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  const username = localStorage.getItem('username');

  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      // Realizar la solicitud GET para unirse a la sala
      //const response = await axios.get(`${apiEndpoint}/joinroom/${roomId}/${username}`);
      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log("id de la sala: "+roomId+" username: "+username);
      socket.emit('joinRoom', {id:roomId, username:username });

      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      socket.on('roomJoined', (roomId) => {
        navigate(`/room/${roomId}`);
      });
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error
      console.error('Error al unirse a la sala:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Ingrese el ID de la sala"
      />
      <button onClick={handleJoinRoom} disabled={isLoading}>
        {isLoading ? 'Uniéndose...' : 'Unirse a Sala'}
      </button>
    </div>
  );
};

export default JoinRoomForm;
