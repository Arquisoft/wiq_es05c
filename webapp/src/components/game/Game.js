import { Box} from "@chakra-ui/react";
import { QuestionArea } from './QuestionArea';
import { useEffect, useState } from 'react';
/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego */
function Game({gameMode}) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedQuestions = await gameMode.fetchQuestions();
      setQuestions(fetchedQuestions);
      setIsLoading(false);


      console.log("preguntas en el game "+questions);
    }
  
    fetchData();
  }, [gameMode]);
  
  return (
    <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <QuestionArea data-testid="question-area" questions={questions}/>
      )}
    </Box>
  );
}

export default Game;
