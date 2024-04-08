import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react';

function RankingRoom({darkMode}) {
  // Obtener el ranking del estado de la navegación
  const location = useLocation();
  const ranking = location.state.ranking;

  // Ordenar el ranking por el número de respuestas correctas y, en caso de empate, por el tiempo total
  ranking.sort((a, b) => {
    if (b.correctas !== a.correctas) {
      return b.correctas - a.correctas;
    } else {
      return a.tiempoTotal - b.tiempoTotal;
    }
  });

  // Dividir el ranking en los tres primeros jugadores y el resto
  const topThree = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <ChakraProvider>
    <VStack spacing={8}>
      <Heading>Ranking</Heading>

      {/* Podio */}
      <HStack spacing={8}>
        {topThree.map((player, index) => (
          <VStack key={index} borderWidth={1} borderRadius="lg" p={4} align="center">
            <Badge colorScheme={index === 0 ? "gold" : index === 1 ? "silver" : "bronze"} p={1} mb={2}>
              Puesto {index + 1}
            </Badge>
            <Heading size="md">{player.username}</Heading>
            <Text>{player.correctas} respuestas correctas</Text>
            <Text>Tiempo total: {player.tiempoTotal}</Text>
          </VStack>
        ))}
      </HStack>

      {/* Resto de jugadores */}
      <VStack align="start" spacing={4}>
        {rest.map((player, index) => (
          <HStack key={index + 3} w="100%" justify="space-between">
            <Text>Puesto {index + 4}: {player.username}</Text>
            <Text>{player.correctas} respuestas correctas</Text>
            <Text>Tiempo total: {player.tiempoTotal}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>

    </ChakraProvider>
  );
}

export default RankingRoom;