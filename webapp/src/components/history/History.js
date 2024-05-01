import React from 'react';
import { useEffect, useState} from 'react';
import { Box, Spinner} from "@chakra-ui/react";
import { AllGamesBlock } from './AllGamesBlock';
import { StatsBlock } from './StatsBlock';
import { act } from 'react-dom/test-utils';
import { useTranslation } from 'react-i18next';
import { Text } from "@chakra-ui/react";

export function History({darkMode}){

  //obtenemos el usuario en sesion
  const usuario = localStorage.getItem('username');

  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  let gamesEndpoint = apiEndpoint+`/getHistoryDetallado?usuario=${usuario}`;
  let statisticsEndpoint = apiEndpoint+`/getHistoryTotal?usuario=${usuario}`;

  const [allGames, setAllGames] = useState([]);//Para todos los juegos
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [stats, setStatistics] = useState([]);//Para las estadisticas completas de todos los juegos
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [neverPlayer, setNeverPlayer] = useState(false);

  //para la internacionalización
  const {t} = useTranslation();

  useEffect(() => {
    fetch(gamesEndpoint)
      .then(response => response.json())
      .then(partidas => {
        console.log("Partidas: ");
        console.log(partidas);

        console.log(typeof partidas);
        if(partidas.error){
          console.log('neverPlayer a true en useEffect en partidas');
          setNeverPlayer(true);
          setIsLoadingGames(false);
        }
        else{
          act(() => {
            console.log('neverPlayer a false en useEffect en partidas');
            console.log('setAllGames ', Object.values(partidas));
            let gamesArray = Object.values(partidas);
            setAllGames(gamesArray);
            setIsLoadingGames(false);
          });
       }
      })
      .catch(error => {
        //console.error('Error cargando el historial de todas las partidas del usuario:', error);
      }) .finally(() => {
        console.log('setIsLoadingGames a false finally ');

        setIsLoadingGames(false);
      });
  }, [gamesEndpoint]);//<-cambiar el array de depencias error despliegue

  useEffect(() => {
    fetch(statisticsEndpoint)
      .then(response => response.json())
      .then(estadisticas => {
        console.log("Estadísticas: ");
        console.log(estadisticas);
        if(estadisticas.error ){
          console.log('neverPlayer a true en useEffect en estadisticas');
          setNeverPlayer(true);
          setIsLoadingStats(false);
        }
        else{
          act(() => {
           //console.log('neverPlayer a false en useEffect en estadisticas');
            //console.log('setAllGames ', Object.values(estadisticas));
            setStatistics(estadisticas);
            setIsLoadingStats(false);
          });
        }
      })
      .catch(error => {
        //console.error('Error cargando las estadísticas del usuario:', error);
      }).finally(() => {
        console.log('setIsLoadingStats a false finally ');
        setIsLoadingStats(false);
      });
  }, [statisticsEndpoint]);//<- cambiar el array de depencias error despliegue


  //console.log(darkMode);
  let backgroundColor = darkMode ? '#001c17' : '#37BEB0';
  let text = darkMode ? '#FCFAF0' : '#071815';

    return (
    <Box backgroundColor={backgroundColor} margin="1em" borderRadius="1em" flexGrow="1" border={"0.1em solid"+text}>
    {(isLoadingGames || isLoadingStats) ? (
      <Spinner
        thickness='0.3em'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        marginTop='5em'
        data-testid="loading-spinner"
      />//Para mientras carga
    ) :neverPlayer ? (
        <Box id='noplay-history' display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">    
          <Text fontSize="2xl" fontFamily='Roboto'>{t('historyNoData')}</Text>
          <Text fontSize="2xl" fontFamily='Roboto'>{t('historyNoDataParraf')}</Text>
      </Box>
        ) : (
      <Box id='main-history' backgroundColor={backgroundColor}>
        <StatsBlock darkMode={darkMode} playerStats={stats} />
        <AllGamesBlock games={allGames} darkMode={darkMode}/>
      </Box>
    )}
  </Box>
  );
}