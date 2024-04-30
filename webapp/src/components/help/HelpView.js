import { Box, Heading, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const HelpView = (darkMode) => {

  let backgroundColor = darkMode.darkMode ? '#08313A' : '#b5b4b1';
  let text = darkMode.darkMode ? '#FCFAF0' : '#08313A';
 
  //para la internacionalización
  const {t} = useTranslation();

  return (
    <Box p={5} textAlign="left" style={{ flexGrow: "1" }} backgroundColor={backgroundColor}>
      <Heading as="h1" fontSize="4xl" mb={3} color={text}>{t('helpTitle')}</Heading>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('helpBasicTitle')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('helpBasic')}</Text>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('helpCustomTitle')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('helpCustom')}</Text>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('helpCategoryTitle')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('helpCategory')}</Text>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('helpDailyTest')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('helpDaily')}</Text>
      <Text fontSize="xl" mb={3} fontWeight="bold" color={text}>{t('helpSageTitle')}</Text>
      <Text fontSize="lg" mb={3} color={text}>{t('helpSage')}</Text>
    </Box>



  );
};

export default HelpView;