import { Box, Text, Heading } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

export function GameBlock( {darkMode, gameInfo} ){

    
    //para la internacionalización
    const {t, i18n} = useTranslation();

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
    let fechaFormateada = fecha.toLocaleDateString(i18n.language, options);

    let numeroJuego = gameInfo.numeroJuego;
    let aciertos = gameInfo.preguntas_acertadas;
    let fallos = gameInfo.preguntas_falladas;
    let totalPreguntas = aciertos + fallos;
    let tiempo = gameInfo.tiempo;

    
    let redColor = "#BA0F30";
    let orangeColor = "#E66912"; 
    let greenColor = "#1D741B";

    //Esta funcion devuelve el color en vista de los aciertos/fallos
    function getBackgroundColor(aciertos, total) {
        if(darkMode){
            let porcentaje = aciertos / total;
        
            if (porcentaje < 0.33) {
                return redColor;
            } else if (porcentaje < 0.66) {
                return orangeColor;
            } else {    
                return greenColor;
            }
        }
    }

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
                <Heading fontSize='1.5em' color={text} textAlign="center">{t('date')}</Heading>
                <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{fechaFormateada}</Text>
            </Box>
            <Box id='accuarcy-partida' flex="4" display="flex" flexDirection="column" borderRight={"1px solid"+text}>
                <Box id='num-aciertos' display="flex" flexDirection="column" margin="1em">
                    <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">{t('questionsCorrect')}</Heading>
                    <Text fontSize='1.5em' color={text} textAlign="center" fontWeight="bold">{aciertos}/{totalPreguntas}</Text>                
                </Box>
                <Box id='num-fallos' display="flex" flexDirection="column" margin="1em"  alignItems="center"> 
                    <Heading fontSize='1.5em' color={text} textAlign="center" flex="1">{t('questionsFailed')}</Heading>
                    <Text fontSize='1.5em' color={text} textAlign="center" fontWeight="bold">{fallos}/{totalPreguntas}</Text>                
                </Box>
            </Box>
            <Box id='duracion-partida' flex="4" display="flex" flexDirection="column" justifyContent="space-evenly">
                <Heading fontSize='1.5em' color={text} textAlign="center">{t('gameTime')}</Heading>
                <Text fontSize='1.5em' color={titles} textAlign="center" fontWeight="bold">{tiempo}{t('timeUnit')}</Text>
            </Box>
        </Box>
    );
};