import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket';
import { useTranslation } from 'react-i18next';

const CreateRoomForm = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const username = localStorage.getItem('username');

    //para la internacionalización
    const {t} = useTranslation();
  
    useEffect(() => {
      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      socket.on('roomCreated', (roomId) => {
        //madnarle al room quien es el host 
        navigate(`/room/${roomId}`, { state: { isHost: true } });
      });
  
      // No olvides limpiar el listener del evento cuando el componente se desmonte
      return () => socket.off('roomCreated');
    }, [navigate]);
  
    const handleCreateRoom = () => {
        console.log("creando sala");
      setIsLoading(true);
      // Emitir evento para crear la sala
      socket.emit('createRoom', { username });
    };

    return (
        <div>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder={t('roomCreatePlaceholder')}
            />
            <button onClick={handleCreateRoom} disabled={isLoading}>
                {isLoading ? t('roomWaitCreateMessage') : t('roomCreateButton')}
            </button>
        </div>
    );
};

export default CreateRoomForm;
