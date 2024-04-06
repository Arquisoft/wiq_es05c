import React from 'react';
import {GameBlock} from './GameBlock';
import { Box, Heading} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

export function AllGamesBlock({darkMode, games }){

    let backgroundColor = darkMode ? '#D3B1C2' : '#D3B1C2';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    //para la internacionalización
    const {t} = useTranslation();

    let hasHistory = true;//Por defecto lo pongo a true

    let errorMessage = games[0];

    if (!games || errorMessage.includes("Error")) {
        hasHistory = false;
    }

    if (!hasHistory) {
        return (
            <Box id='stats-block-container'>
                <Heading size="xl" margin="1em" color={darkMode ? '#FCFAF0' : '#08313A'} textAlign="center">{t('noHistoryGamesMessage')}</Heading>
            </Box>
        );
    }

    console.log("Partidas  x: "+games);
    console.log(games);
    return (
        <Box id='bloque-partidas' backgroundColor={backgroundColor} border={"2px solid"+text}
        borderRadius="1em" margin="1em">
            <Heading marginLeft="1em" fontSize='1.8em' color={titles}>{t('gamesPlayed')}</Heading>
            {games.map((game, index) => (
                <GameBlock key={index} gameInfo={game} darkMode={darkMode}/>
            ))}
        </Box>
    );
};