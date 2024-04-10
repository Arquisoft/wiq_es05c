import React from 'react';
import { Box, Image, useDisclosure, Button,ChakraProvider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const {t} = useTranslation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()


  const handleClickClassic = () => {
    navigate("/game");
  };
  const handleClickSameCat = () => {
    navigate("/gameSameCat");
  };
  const handleClickInfinity = () => {
    navigate("/gameInfinity");
  };
  const handleClickCustom = () => {
    navigate("/customWindow");
  };
  const handleClickDiario = () => {
    navigate("/game");
  };


 
  return (
    <ChakraProvider>
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <Box 
        id="seccion-juegos-left" 
        flex="1" 
        flexDirection="column"  
        display="flex" 
        justifyContent="center"
        alignItems="center"
      >
        <Button 
          id="button-infinite-game" 
          onClick={handleClickInfinity} 
          margin="2em" 
          colorScheme='blue' variant='solid'
          >
          {t('modoClasico')}
        </Button>
        <Button 
          id="button-samecat-game" 
          onClick={handleClickSameCat} 
          margin="2em" 
          colorScheme='green' variant='solid'
        >
          {t('modoMismaCategoria')}
        </Button>
      </Box>
  
      <Box 
        id="seccion-icono" 
        flex="1" 
        flexDirection="column" 
        alignItems="center" 
        display="flex"
      >
        <Image src='/wiq3.jpg' alt='Icono WIQ05' borderRadius='50em' boxSize="20em" margin="1em"/>
        <Button 
          id="button-diario-game" 
          onClick={handleClickDiario} 
          disabled="true" 

        >
          {t('modoDiario')}
        </Button>
      </Box>
  
      <Box 
        id="seccion-juegos-right" 
        flex="1" 
        flexDirection="column"  
        display="flex" 
        justifyContent="center"
        alignItems="center"
      >
        <Button 
          id="button-infinite-game" 
          onClick={handleClickInfinity} 
          margin="2em" 

        >
          {t('modoInfinito')}
        </Button>
        <Button 
          id="button-custom-game" 
          onClick={handleClickCustom} 
          margin="2em" 
          colorScheme='teal' variant='solid'

        >
          {t('modoCustom')}
        </Button>
      </Box>
    </Box>
    </ChakraProvider>
  );
};

export default Home;