import React, { useState,useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Text, Center, VStack } from "@chakra-ui/react"; 
import { useToast } from "@chakra-ui/react";
import socket from './socket';
import { useTranslation } from 'react-i18next';

const JoinRoomForm = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const username = localStorage.getItem('username');

  const toast = useToast();

  //para la internacionalización
  const {t} = useTranslation();

  useEffect(() => {
    socket.on('roomJoined', (roomId) => {
      navigate(`/room/${roomId}`);
      toast({
        title: "Unido a la sala con éxito.",
        description: `Te has unido a la sala ${roomId}.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });

    socket.on('roomErrorJoining', () => {
      console.log("escuchando evento error al unirse a sala");
      toast({
        render: () => (
          <Box id="error-toast">
            <Text>Error al unirse a la sala.</Text>
            <Text>No te has podido unir a la sala.</Text>
          </Box>
        ),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
  
    });

    
    return () => {
      // Limpiar los manejadores de eventos cuando el componente se desmonte
      socket.off('roomJoined');
      socket.off('roomErrorJoining');
    };
   }, [navigate, toast]);

  const handleJoinRoom = async () => {
    
    
    try {
      setIsLoading(true);
      console.log("id de la sala: "+roomId+" username: "+username);
      socket.emit('joinRoom', {id:roomId, username:username });

      
    } catch (error) {
      console.error('Error al unirse a la sala:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <VStack spacing={5}>
        <Center>
          <Text fontSize="xl" textAlign="center">{t('roomJoinButton')}</Text>
        </Center>
        <Input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder={t('roomCreatePlaceholder')}
          size="lg"
          data-testid="room-id-input"
          id="room-id-input"
        />
        <Button onClick={handleJoinRoom} isLoading={isLoading} colorScheme="teal" variant="outline" id="roomJoin-button">
          {t('roomJoinButton')}
        </Button>
      </VStack>
    </Box>
  );
};

export default JoinRoomForm;