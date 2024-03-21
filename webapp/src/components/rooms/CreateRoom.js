import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    const username = localStorage.getItem('username');

    const handleCreateRoom = async () => {
        try {
            setIsLoading(true);
            // Realizar la solicitud GET para crear la sala
            const response = await axios.get(`${apiEndpoint}/createroom/${username}`);
            // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            console.log('Sala creada webapp:', response.data.room);
            // Navegar a la sala después de crearla
            navigate(`/room/${response.data.room}`);
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
