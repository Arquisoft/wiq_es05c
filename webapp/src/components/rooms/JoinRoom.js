import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Text, Tooltip, Icon, Center, VStack, HStack } from "@chakra-ui/react"; 
import { InfoOutlineIcon } from '@chakra-ui/icons';

import socket from './socket';
const JoinRoomForm = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  const username = localStorage.getItem('username');

  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      console.log("id de la sala: "+roomId+" username: "+username);
      socket.emit('joinRoom', {id:roomId, username:username });

      socket.on('roomJoined', (roomId) => {
        navigate(`/room/${roomId}`);
      });
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