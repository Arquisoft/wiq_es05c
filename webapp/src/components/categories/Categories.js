import React from 'react';
import { Box, Image, Button,ChakraProvider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleClickGeography = () => {
    navigate("/gameSameCat?category=geografia");
  };
  const handleClickArt = () => {
    navigate("/gameSameCat?category=arte");
  };
  const handleClickEntertainment = () => {
    navigate("/gameSameCat?category=entretenimiento");
  };
  const handleClickSports = () => {
    navigate("/gameSameCat?category=deportes");
  };
  const handleClickHistory = () => {
    navigate("/gameSameCat?category=historia");
  };
  const handleClickScience = () => {
    navigate("/gameSameCat?category=ciencia");
  };
  const handleClickMusic = () => {
    navigate("/gameSameCat?category=musica");
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
          id="button-category-geography" 
          onClick={handleClickGeography} 
          margin="2em" 
          colorScheme='blue' variant='solid'
          >
          {t('categoryGeography')}
        </Button>

        <Button 
          id="button-category-art" 
          onClick={handleClickArt} 
          margin="2em" 
          colorScheme='green' variant='solid'
        >
          {t('categoryArt')}
        </Button>
        
        <Button 
          id="button-category-science" 
          onClick={handleClickScience} 
          margin="2em" 
          colorScheme='green' variant='solid'
        >
          {t('categoryScience')}
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
          id="button-category-history" 
          onClick={handleClickMusic} 
          disabled="true" 

        >
          {t('categoryMusic')}
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
          id="button-category-entertainment" 
          onClick={handleClickEntertainment} 
          margin="2em" 
        >
          {t('categoryEntertainment')}
        </Button>

        <Button 
          id="button-category-sports" 
          onClick={handleClickSports} 
          margin="2em" 
          colorScheme='teal' variant='solid'
        >
          {t('categorySports')}
        </Button>

        <Button 
          id="button-category-history" 
          onClick={handleClickHistory} 
          margin="2em" 
          colorScheme='teal' variant='solid'
        >
          {t('categoryHistory')}
        </Button>
        
      </Box>
    </Box>
    </ChakraProvider>
  );
};

export default CategoriesWindow;