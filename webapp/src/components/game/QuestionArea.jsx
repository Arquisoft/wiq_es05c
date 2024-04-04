import { useEffect, useState, useRef } from 'react';
import { Box } from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';
import { Timer } from './timers/Timer';
import { GameTimer } from './timers/GameTimer.jsx';

export function QuestionArea({darkMode, question, setTotalCorrectAnswers, setTotalIncorrectAnswers, setFinished, setTotalTimeFinish, timeToAnswer=30000, nextQuestion}){
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
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

  useEffect(() => {
    if(isGameEnded){
      setTotalCorrectAnswers(correctAnswers);
      setTotalIncorrectAnswers(incorrectAnswers);
      console.log("El juego ha terminado con un tiempo total de: ", totalTime, " segundos.");
      setTotalTimeFinish(totalTime);
      setFinished(true);
    }
  },[isGameEnded, totalTime]);

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    nextQuestion();
  };

  const handleTimeout = () => {
    nextQuestion();
  };

  return(
    <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
    maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
      <Box display="flex" borderBottom="0.1em solid #000">
        <Timer darkMode={darkMode} onTimeout={handleTimeout} resetTimer={resetTimer} timeout={timeToAnswer} />
        <EnunciadoBlock darkMode={darkMode} pregunta={question?.pregunta} />
        <GameTimer darkMode={darkMode} isGameEnded={isGameEnded} setTotalTime={setTotalTime}/>
      </Box>
      <AnswersBlock darkMode={darkMode} respuestas={respuestas} correcta={question?.correcta} onAnswerSelect={handleAnswerSelect} isGameEnded={isGameEnded}/>
    </Box>
  )
}