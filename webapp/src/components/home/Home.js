import React from 'react';
import { Box, Image, useDisclosure, Text, Button } from '@chakra-ui/react';
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
    <Box boxSize='sm' display="flex">
      <Box id="seccion-juegos-left" flex="1" flexDirection="column"  display="flex" justifyContent="center">
        <button id="button-classic-game" onClick={handleClickClassic} margin="5em">
          {t('modoClasico')}
        </button>
        <button id="button-samecat-game" onClick={handleClickSameCat} margin="5em">
          {t('modoMismaCategoria')}
        </button>
      </Box>
      <Box id="seccion-icono" flex="1" flexDirection="column" alignItems="center" display="flex">
        <Image src='/wiq3.jpg' alt='Icono WIQ05' borderRadius='50em' boxSize="20em" margin="1em"/>
        <button id="button-diario-game" onClick={handleClickDiario} disabled="true">
          {t('modoDiario')}
        </button>
        </Box>
      <Box id="seccion-juegos-right" flex="1" flexDirection="column"  display="flex" justifyContent="center">
        <button id="button-infinite-game" onClick={handleClickInfinity}>
          {t('modoInfinito')}
        </button>
        <button id="button-custom-game" onClick={handleClickCustom}>
          {t('modoCustom')}
        </button>
      </Box>
    </Box>
  );
};

export default Home;