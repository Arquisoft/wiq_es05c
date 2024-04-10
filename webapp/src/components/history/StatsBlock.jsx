import React from 'react';
import { Heading, Box, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export function StatsBlock({ darkMode,playerStats }){    
    
    //para la internacionalización
    const {t} = useTranslation();

    let hasHistory = true;//Por defecto lo pongo a true

    if (!playerStats || !playerStats.nombreUsuario || playerStats.tiempoMedio === 0) {
        hasHistory = false;
    }

    let backgroundColor = darkMode ? '#001c17' : '#fef5c6';
 
    if (!hasHistory) {
        return (
            <Box id='stats-block-container'>
                <Heading size="xl" margin="1em" color={backgroundColor} textAlign="center">{t('noHistoryMessage')}</Heading>
            </Box>
        );
    }
    
    let nombreJugador = playerStats.nombreUsuario;
    
    let tiempo = playerStats.tiempoTotal;
    
    let tiempoFormateado = formatTime(tiempo);

    let tiempoMedioFormateado = formatTime(playerStats.tiempoMedio);

    let aciertosRedondeados = 1//parseFloat(playerStats.preguntas_acertadas.toFixed(2));

    let fallosRedondeados = 1//parseFloat(playerStats.preguntas_falladas.toFixed(2));

    function formatTime(tiempo) {
        let hours = Math.floor(tiempo / 3600);
        tiempo %= 3600;
    
        let minutes = Math.floor(tiempo / 60);
        let seconds =  Math.floor(tiempo % 60);
    
        let tiempoFormateado = '';
    
        if (hours > 0) {
            tiempoFormateado += `${hours}${t('timeUnitHours')} `;
        }
    
        if (minutes > 0 || hours > 0) { // Si hay horas, se mostrarán los minutos aunque sean 0
            tiempoFormateado += `${minutes}${t('timeUnitMinutes')}`;
        }

        tiempoFormateado += `${seconds}${t('timeUnit')}`;
        
    
        return tiempoFormateado;
    }

    let statBackgroundColor = darkMode ? '#282828' : '#D4F1F4';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    return (
        <Box id='stats-block-container'>
        <Heading size="xl" margin="1em" color={text} textAlign="center">{t('historyMessage')} {nombreJugador}</Heading>
            <Box id='box-for-title' backgroundColor={statBackgroundColor} border={"2px solid"+text} borderRadius="1em" margin="0 1em"
            display="flex" flexDirection="column" minHeight="15em"
            >
                <Heading marginLeft="1em" fontSize='1.8em' color={titles}>{t('resume')}</Heading>
                <Box id='stats-zone' flex="1"
                display="flex"
                >
                    <Box id='stats-partidas' flex="1" display="flex" flexDirection="column" justifyContent="space-evenly" borderRight={"2px solid"+text} borderTop={"2px solid"+text}>
                        <Heading fontSize='1.5em' color={text} textAlign="center">{t('gamesPlayed')}</Heading>
                        <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{playerStats.numeroJuegos}</Text>
                    </Box>
                    <Box id='stats-accuarcy'  flex="1" display="flex" flexDirection="column" borderTop={"2px solid"+text}>
                        <Box id='stats-aciertos' flex="1" display="flex" flexDirection="row" margin="1em" justifyContent="space-evenly" alignItems="center">
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">{t('questionsCorrect')}</Heading>
                            <CircularProgress value={aciertosRedondeados} color="#32CD30" size="2em" flex="1" display="flex" justifyContent="center">
                                <CircularProgressLabel color={text} fontSize='0.4em' fontWeight="bold">{aciertosRedondeados}{t('questionsPercentage')}</CircularProgressLabel>
                            </CircularProgress>                        
                        </Box>
                        <Box id='stats-fallos' flex="1" display="flex" flexDirection="row" margin="1em"  alignItems="center"> 
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">{t('questionsFailed')}</Heading>
                            <CircularProgress value={fallosRedondeados} color="#970C10" size="2em" flex="1" display="flex" justifyContent="center">
                                <CircularProgressLabel color={text} fontSize='0.4em' fontWeight="bold">{fallosRedondeados}{t('questionsPercentage')}</CircularProgressLabel>
                            </CircularProgress>   
                        </Box>
                    </Box>
                    <Box id='stats-tiempos' flex="1" display="flex" flexDirection="column" borderTop={"2px solid"+text} borderLeft={"2px solid"+text}>
                        <Box id='stats-tiempo-total' flex="1" display="flex" flexDirection="row" margin="1em" justifyContent="space-evenly" alignItems="center">

                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="2">{t('totalTime')}</Heading>
                            <Text fontSize='1.5em' color={titles} textAlign="center" flex="1" fontWeight="bold">{tiempoFormateado}</Text>       
                        </Box>
                        <Box id='stats-tiempo-medio' flex="1" display="flex" flexDirection="row" margin="1em"  alignItems="center"> 
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="2">{t('averageTime')}</Heading>
                            <Text fontSize='1.5em' color={titles} textAlign="center" flex="1" fontWeight="bold">{tiempoMedioFormateado}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};