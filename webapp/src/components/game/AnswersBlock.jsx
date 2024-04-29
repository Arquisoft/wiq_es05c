import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { AnswerButton } from './AnswerButton.jsx';
//onAnswerSelect es la funcion de QuestionArea que se ejecuta al hacer click en boton 
export function AnswersBlock({ respuestas, correcta ,onAnswerSelect,isGameEnded, darkMode}){

    const [respuestasAleatorizadas, setRespuestasAleatorizadas] = useState([]);

    
    let respuestasCopy = respuestas;

    //Colores de los botones para que tengan orden random
    //console.log("En asnblock "+darkMode.darkMode);
    
    const colorsArray= darkMode.darkMode? ["#FFD743","#D773A2","#07BB9C","#A06AB4"] : ["#CCA1F3","#D19FC6","#C8F4F9","#B5EECB"];
    //Baraja con algoritmo de Fisher-Yates los colores
    for (let i = colorsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colorsArray[i], colorsArray[j]] = [colorsArray[j], colorsArray[i]];
    }

    useEffect(() => {
        //Baraja con algoritmo de Fisher-Yates
        for (let i = respuestasCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [respuestasCopy[i], respuestasCopy[j]] = [respuestasCopy[j], respuestasCopy[i]];
        }

        setRespuestasAleatorizadas(respuestasCopy);
    }, [respuestasCopy]);

    const handleButtonClick = (respuesta) => {
        if (isGameEnded) {
            return;
        }
        if (respuesta === correcta) {
            onAnswerSelect(true);
        } else {
            onAnswerSelect(false);
        }
    };

    return (
        <Box display="grid" flex="1" gridTemplateColumns="repeat(2,1fr)" gridColumnGap="2em" padding="4em" alignItems="center">
            {respuestasAleatorizadas.map((respuesta, index) => (
                <AnswerButton darkMode={darkMode} indexx={index} text={respuesta} colorFondo={colorsArray[index]} onClick={() => handleButtonClick(respuesta)} />
            ))}
        </Box>
    );
}
