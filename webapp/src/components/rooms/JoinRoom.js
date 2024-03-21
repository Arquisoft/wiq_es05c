import React, { useState } from 'react';
import axios from 'axios';

const JoinRoomForm = () => {
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  const username = localStorage.getItem('username');

  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      // Realizar la solicitud GET para unirse a la sala
      const response = await axios.get(`${apiEndpoint}/joinroom/${roomId}/${username}`);
      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log('Te has unido a la sala:', response.data);
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
