import React, { useState,useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Text, Tooltip, Icon, Center, VStack, HStack } from "@chakra-ui/react"; 
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useToast } from "@chakra-ui/react";
import socket from './socket';
const JoinRoomForm = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  const username = localStorage.getItem('username');

  const toast = useToast();

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
        title: "Error al unirse a la sala.",
        description: `No te has podido unir a la sala.`,
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
   }, []);

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
          <Text fontSize="xl" textAlign="center">Unirse a Sala</Text>
        </Center>
        <Input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Ingrese el ID de la sala"
          size="lg"
        />
        <Button onClick={handleJoinRoom} isLoading={isLoading} colorScheme="teal" variant="outline">
          Unirse a Sala
        </Button>
      </VStack>
    </Box>
  );
};

export default JoinRoomForm;