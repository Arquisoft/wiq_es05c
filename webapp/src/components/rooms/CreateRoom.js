import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, VStack, Center } from "@chakra-ui/react";

import { useTranslation } from 'react-i18next';
import socket from './socket';

const CreateRoomForm = () => {
    const navigate = useNavigate();

    const {t} = useTranslation();

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
            <Text fontSize="xl" textAlign="center">{t('roomCreateButton')}</Text>
          </Center>
          <Text fontSize="md" textAlign="center" data-testid="info-text">
              {t('createRoomInfo')}
          </Text>
          <Button onClick={handleCreateRoom} isLoading={isLoading} colorScheme="teal" variant="outline" id="createRoom" data-testid="createRoom">
            {isLoading ? t('roomWaitCreateMessage') : t('roomCreateButton')}
          </Button>
        </VStack>
      </Box>
  );
};

export default CreateRoomForm;
