import { Box, Heading, Text } from '@chakra-ui/react';



const PrincipalView = (darkMode) => {

  let backgroundColor = darkMode.darkMode ? '#08313A' : '#b5b4b1';
  let text = darkMode.darkMode ? '#FCFAF0' : '#08313A';

  return (
    <Box p={5} textAlign="center" style={{ flexGrow:"1"}} backgroundColor={backgroundColor}>
      <Heading as="h1" fontSize="4xl" mb={3} color={text}>wiq_es05c</Heading>
      <Text fontSize="2xl" mb={5} color={text}>Nuestro grupo: como y después el juego</Text>
      <Text fontSize="xl" color={text}>Bienvenido a nuestro juego de preguntas</Text>
      <Text fontSize="lg" mb={3} color={text}>Somos un equipo de desarrolladores apasionados por los juegos de preguntas.</Text>
      <Text fontSize="lg" color={text}>En este juego, te desafiamos a responder una serie de preguntas aleatorias de diferentes categorías. Ofrecemos varios modos de juego para mantener las cosas interesantes. ¡Buena suerte!</Text>
    </Box>
  );
};

export default PrincipalView;