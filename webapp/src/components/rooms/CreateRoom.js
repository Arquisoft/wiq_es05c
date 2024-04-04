import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, VStack, Center } from "@chakra-ui/react";

import socket from './socket';
const CreateRoomForm = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const username = localStorage.getItem('username');
  
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
      <Box p={5} shadow="md" borderWidth="1px">
        <VStack spacing={5}>
          <Center>
            <Text fontSize="xl" textAlign="center">Crear Sala</Text>
          </Center>
          <Text fontSize="md" textAlign="center" data-testid="info-text">
              Al hacer clic en "Crear Sala", se creará una nueva sala con un ID único. 
              Deberás compartir este ID con las personas que quieras que se unan a tu sala.
          </Text>
          <Button onClick={handleCreateRoom} isLoading={isLoading} colorScheme="teal" variant="outline" id="createRoom" data-testid="createRoom">
            {isLoading ? 'Creando...' : 'Crear Sala'}
          </Button>
        </VStack>
      </Box>
  );
};

export default CreateRoomForm;
