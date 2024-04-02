import { Box, Text, Heading } from "@chakra-ui/react";

export function GameBlock( {darkMode, gameInfo} ){

    console.log("Partida: " + gameInfo);
    /*
        let fecha = gameInfo.fecha;
        let numeroJuego = gameInfo.numeroJuego;
        let aciertos = gameInfo.preguntas_acertadas;
        let fallos = gameInfo.preguntas_falladas;
        let tiempo = gameInfo.tiempo;
    */
   //Parseo la fecha, la dife de hora es que la pasa a la hora de españa
   //Sin parsear 2024-03-20T00:00:00.000Z --- Parseada  20 de marzo de 2024, 01:00
    let fecha = new Date(gameInfo.fecha);
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let fechaFormateada = fecha.toLocaleDateString(undefined, options);

    let numeroJuego = gameInfo.numeroJuego;
    let aciertos = gameInfo.preguntas_acertadas;
    let fallos = gameInfo.preguntas_falladas;
    let totalPreguntas = aciertos + fallos;
    let tiempo = gameInfo.tiempo;

    
    function formatTime(tiempo) {
        let hours = Math.floor(tiempo / 3600);
        tiempo %= 3600;
    
        let minutes = Math.floor(tiempo / 60);
        let seconds =  Math.floor(tiempo % 60);
            
        let tiempoFormateado = '';
    
        if (hours > 0) {
            tiempoFormateado += `${hours.toFixed(2)}h `;
        }
    
        if (minutes > 0 || hours > 0) { // Si hay horas, se mostrarán los minutos aunque sean 0
            tiempoFormateado += `${minutes.toFixed(2)}m `;
        }
    
        tiempoFormateado += `${seconds.toFixed(2)}s`;
    
        return tiempoFormateado;
    }

    //Esta funcion devuelve el color en vista de los aciertos/fallos
    function getBackgroundColor(aciertos, total) {
        let porcentaje = aciertos / total;
    
        let hue = porcentaje * 120; // Interpola entre rojo (0) y verde (120) en el espacio de color HSL
    
        return `hsl(${hue}, 50%, 70%)`; // Devuelve un color en formato HSL
    }

    let statBackgroundColor = darkMode ? '#D4F1F4' : '#D4F1F4';
    let text = darkMode ? '#FCFAF0' : '#08313A';
    let titles = darkMode ? '#90ADC6' : '#00325E';

    let backgroundColor = getBackgroundColor(aciertos, totalPreguntas);

    return (
        <Box border="1px" borderRadius="10em" p={4} display="flex" flexDirection="row" backgroundColor={backgroundColor} margin="0.5em">
            <Box id='num-partida' flex="1" display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center" borderRight={"2px solid"+text}>
                <Heading fontSize='1.5em' color={text} textAlign="center">Nº</Heading>
                <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{numeroJuego}</Text>
            </Box>
            <Box id='fecha-partida' flex="4" display="flex" flexDirection="column" justifyContent="space-evenly" borderRight={"1px solid"+text}>
                <Heading fontSize='1.5em' color={text} textAlign="center">Fecha</Heading>
                <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{fechaFormateada}</Text>
            </Box>
            <Box id='accuarcy-partida' flex="4" display="flex" flexDirection="column" borderRight={"1px solid"+text}>
                <Box id='num-aciertos' display="flex" flexDirection="column" margin="1em">
                    <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">Número aciertos</Heading>
                    <Text fontSize='1.5em' color="#32CD30" textAlign="center" fontWeight="bold">{aciertos}/{totalPreguntas}</Text>                
                </Box>
                <Box id='num-fallos' display="flex" flexDirection="column" margin="1em"  alignItems="center"> 
                    <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">Número fallos</Heading>
                    <Text fontSize='1.5em' color="#970C10" textAlign="center" fontWeight="bold">{fallos}/{totalPreguntas}</Text>                
                </Box>
            </Box>
            <Box id='duracion-partida' flex="4" display="flex" flexDirection="column" justifyContent="space-evenly">
                <Heading fontSize='1.5em' color={text} textAlign="center">Duración partida</Heading>
                <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{tiempo}s</Text>
            </Box>
        </Box>
    );
};