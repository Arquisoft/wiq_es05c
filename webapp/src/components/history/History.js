import React from 'react';
import { useEffect, useState} from 'react';
import { Box, Spinner} from "@chakra-ui/react";
import { AllGamesBlock } from './AllGamesBlock';
import { StatsBlock } from './StatsBlock';



export function History({darkMode}){

  const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';
  let gamesEndpoint = apiEndpoint+'/getHistoryDetallado';
  let statisticsEndpoint = apiEndpoint+'/getHistoryTotal';

  const [allGames, setAllGames] = useState([]);//Para todos los juegos
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [stats, setStatistics] = useState([]);//Para las estadisticas completas de todos los juegos
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    fetch(gamesEndpoint)
      .then(response => response.json())
      .then(partidas => {
        console.log("Partidas: ");
        console.log(partidas);
        let gamesArray = Object.values(partidas);
        setAllGames(gamesArray);
        setIsLoadingGames(false);
      })
      .catch(error => {
        console.error('Error cargando el historial de todas las partidas del usuario:', error);
      });
  }, []);

  useEffect(() => {
    fetch(statisticsEndpoint)
      .then(response => response.json())
      .then(estadisticas => {
        console.log("Estadísticas: ");
        console.log(estadisticas);
        setStatistics(estadisticas);
        setIsLoadingStats(false);
      })
      .catch(error => {
        console.error('Error cargando las estadísticas del usuario:', error);
      });
  }, []);



  console.log(darkMode);
  let backgroundColor = darkMode ? '#001c17' : '#fef5c6';
  let text = darkMode ? '#FCFAF0' : '#08313A';

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
      />//Para mientras carga
    ) : (
      <Box id='main-history' backgroundColor={backgroundColor}>
      <StatsBlock darkMode={darkMode} playerStats={stats} />
      <AllGamesBlock games={allGames} darkMode={darkMode}/>
      </Box>
    )}
  </Box>
  );
}