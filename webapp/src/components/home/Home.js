import React from 'react';
import { Box, Image } from '@chakra-ui/react'

const Home = () => {
  return (
    <Box boxSize='sm' display="flex">
      <Box flex="1"></Box>
      <Box flex="1"><Image src='/wiq3.jpg' alt='Icono WIQ05' borderRadius='50em' boxSize="20em" margin="1em"/></Box>
      <Box flex="1"></Box>
    </Box>
  );
};

export default Home;