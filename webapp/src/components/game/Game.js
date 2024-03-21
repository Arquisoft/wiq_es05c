import { Box} from "@chakra-ui/react";
import { QuestionArea } from './QuestionArea';
import { useEffect, useState } from 'react';
/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego */
function Game({gameMode}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setQuestions(await gameMode.fetchQuestions());
      console.log("preguntas en el useeffect del game"+questions);

    }
  
    fetchData();
  }, [gameMode]);
  
  return (
    <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
      <QuestionArea data-testid="question-area" questions={questions}/>
    </Box>
  );
   
  
}

export default Game;
