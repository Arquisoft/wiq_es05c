import { Box, Heading, Text } from '@chakra-ui/react';

const PrincipalView = () => {
  return (
    <Box p={5} textAlign="center" bgGradient="linear(to-b, blue.200, purple.500)" color="white" borderRadius="md" minH="100vh">
      <Heading as="h1" fontSize="4xl" mb={3}>wiq_es05c</Heading>
      <Text fontSize="2xl" mb={5}>Nuestro grupo: como y después el juego</Text>
      <Text fontSize="xl">Bienvenido a nuestro juego de preguntas</Text>
      <Text fontSize="lg" mb={3}>Somos un equipo de desarrolladores apasionados por los juegos de preguntas.</Text>
      <Text fontSize="lg">En este juego, te desafiamos a responder una serie de preguntas aleatorias de diferentes categorías. Ofrecemos varios modos de juego para mantener las cosas interesantes. ¡Buena suerte!</Text>
    </Box>
  );
};

export default PrincipalView;