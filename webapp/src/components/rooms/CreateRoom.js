import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:8005'); // Reemplazar esto por algo no hardcoded
const CreateRoomForm = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    const username = localStorage.getItem('username');

    const handleCreateRoom = async () => {
        try {
            setIsLoading(true);
            // no necesitas esto escuchara el evento socket.io
            //const response = await axios.get(`${apiEndpoint}/createroom/${username}`);
             
            // Emitir evento para crear la sala
            socket.emit('createRoom', { username });

            // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            socket.on('roomCreated', (roomId) => {
                navigate(`/room/${roomId}`);
            });

        } catch (error) {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error('Error al crear la sala:', error);
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
            <button onClick={handleCreateRoom} disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear Sala'}
            </button>
        </div>
    );
};

export default CreateRoomForm;
