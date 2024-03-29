import React from 'react';
import { Heading, Box, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export function StatsBlock({ darkMode,playerStats }){

    let nombreJugador = playerStats.nombreUsuario;
    console.log(playerStats);

    let tiempo = playerStats.tiempoTotal;
    
    let tiempoFormateado = formatTime(tiempo);

    let tiempoMedioFormateado = formatTime(playerStats.tiempoMedio);

    function formatTime(tiempo) {
        let hours = Math.floor(tiempo / 3600);
        tiempo %= 3600;
    
        let minutes = Math.floor(tiempo / 60);
        let seconds = tiempo % 60;
    
        let tiempoFormateado = '';
    
        if (hours > 0) {
            tiempoFormateado += `${hours}h `;
        }
    
        if (minutes > 0 || hours > 0) { // Si hay horas, se mostrarán los minutos aunque sean 0
            tiempoFormateado += `${minutes}m `;
        }
    
        tiempoFormateado += `${seconds}s`;
    
        return tiempoFormateado;
    }

    let backgroundColor = darkMode ? '#001c17' : '#fef5c6';
    let statBackgroundColor = darkMode ? '#D4F1F4' : '#D4F1F4';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';


    return (
        <Box id='stats-block-container'>
        <Heading size="xl" margin="1em" color={text} textAlign="center">Historial de {nombreJugador}</Heading>
            <Box id='box-for-title' backgroundColor={statBackgroundColor} border={"2px solid"+text} borderRadius="1em" margin="0 1em"
            display="flex" flexDirection="column" minHeight="15em"
            >
                <Heading marginLeft="1em" fontSize='1.8em' color={titles}>Resumen</Heading>
                <Box id='stats-zone' flex="1"
                display="flex"
                >
                    <Box id='stats-partidas' flex="1" display="flex" flexDirection="column" justifyContent="space-evenly" borderRight={"2px solid"+text} borderTop={"2px solid"+text}>
                        <Heading fontSize='1.5em' color={text} textAlign="center">Partidas jugadas</Heading>
                        <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{playerStats.numeroJuegos}</Text>
                    </Box>
                    <Box id='stats-accuarcy'  flex="1" display="flex" flexDirection="column" borderTop={"2px solid"+text}>
                        <Box id='stats-aciertos' flex="1" display="flex" flexDirection="row" margin="1em" justifyContent="space-evenly" alignItems="center">
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">Aciertos</Heading>
                            <CircularProgress value={playerStats.preguntas_acertadas} color="#32CD30" size="2em" flex="1" display="flex" justifyContent="center">
                                <CircularProgressLabel fontSize='0.5em' fontWeight="bold">{playerStats.preguntas_acertadas}%</CircularProgressLabel>
                            </CircularProgress>                        
                        </Box>
                        <Box id='stats-fallos' flex="1" display="flex" flexDirection="row" margin="1em"  alignItems="center"> 
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">Fallos</Heading>
                            <CircularProgress value={playerStats.preguntas_falladas} color="#970C10" size="2em" flex="1" display="flex" justifyContent="center">
                                <CircularProgressLabel fontSize='0.5em' fontWeight="bold">{playerStats.preguntas_falladas}%</CircularProgressLabel>
                            </CircularProgress>   
                        </Box>
                    </Box>
                    <Box id='stats-tiempos' flex="1" display="flex" flexDirection="column" borderTop={"2px solid"+text} borderLeft={"2px solid"+text}>
                        <Box id='stats-tiempo-total' flex="1" display="flex" flexDirection="row" margin="1em" justifyContent="space-evenly" alignItems="center">
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="2">Tiempo total jugado</Heading>
                            <Text fontSize='1.5em' color={titles} textAlign="center" flex="1" fontWeight="bold">{tiempoFormateado}</Text>       
                        </Box>
                        <Box id='stats-tiempo-medio' flex="1" display="flex" flexDirection="row" margin="1em"  alignItems="center"> 
                            <Heading fontSize='1.5em' color={text} textAlign="center" flex="2">Tiempo medio por partida</Heading>
                            <Text fontSize='1.5em' color={titles} textAlign="center" flex="1" fontWeight="bold">{tiempoMedioFormateado}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};