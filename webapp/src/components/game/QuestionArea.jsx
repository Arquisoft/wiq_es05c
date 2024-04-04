import { useEffect, useState, useRef } from 'react';
import { Box } from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';
import { Timer } from './timers/Timer';
import { GameTimer } from './timers/GameTimer.jsx';

export function QuestionArea({darkMode, question, isFinished, setTotalTime, timeToAnswer=30000,onAnswerSelect,handleTimeout}){

  // Eliminar los estados correctAnswers e incorrectAnswers

  const [time, setTime] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const resetTimer = useRef(null);

  const fetchQuestionData = () => {
    try {
      const data = question;
      
      const respuestasArray = [data.correcta, data.respuestasIncorrecta1, data.respuestasIncorrecta2, data.respuestasIncorrecta3];
   
      return respuestasArray;
      
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  const respuestas = fetchQuestionData();

  
  const handleButtonClick = (isCorrect) => {
    // Llamar a onAnswerSelect cuando se selecciona una respuesta
    onAnswerSelect(isCorrect);
    //incrementTime(100);
  };

  const onTimeout = () => {
    handleTimeout();

  };

  return(
    <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
    maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
      <Box display="flex" borderBottom="0.1em solid #000">
        <Timer darkMode={darkMode} onTimeout={onTimeout} resetTimer={resetTimer} timeout={timeToAnswer} />
        <EnunciadoBlock darkMode={darkMode} pregunta={question?.pregunta} />
        <GameTimer darkMode={darkMode} isFinished={isFinished} setTotalTime={setTotalTime}/>
      </Box>
      <AnswersBlock darkMode={darkMode} respuestas={respuestas} correcta={question?.correcta} onAnswerSelect={handleButtonClick} isGameEnded={isGameEnded}/>
    </Box>
  )
}