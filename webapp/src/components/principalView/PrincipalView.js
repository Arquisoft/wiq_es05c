import { Box, Heading, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const PrincipalView = (darkMode) => {

  let backgroundColor = darkMode.darkMode ? '#08313A' : '#b5b4b1';
  let text = darkMode.darkMode ? '#FCFAF0' : '#08313A';
 
  //para la internacionalización
  const {t} = useTranslation();

  return (
    <Box p={5} textAlign="left" style={{ flexGrow: "1" }} backgroundColor={backgroundColor}>
      <Heading as="h1" fontSize="4xl" mb={3} color={text} textAlign="center">{t('group')}</Heading>
      <Text fontSize="2xl" mb={5} color={text}>{t('welcomeMessage')}</Text>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('welcomeMessage2')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('welcomeMessage3')}</Text>
      <Text fontSize="lg" color={text}>{t('welcomeMessage4')}</Text>
    </Box>
  );
};

export default PrincipalView;