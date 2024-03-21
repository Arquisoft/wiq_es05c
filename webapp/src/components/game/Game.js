import { Box} from "@chakra-ui/react";
import { QuestionArea } from './QuestionArea';
import { useEffect, useState,useContext } from 'react';
import { CircularProgress } from "@mui/material";
import {GameContext} from './GameContext';
/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego */
function Game() {
  const { startGame, questions, isLoading } = useContext(GameContext);
 
  useEffect(() => {
    startGame();
  }, []);

  

  return (
    <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
         <CircularProgress color="inherit" />

      ) : (
        <QuestionArea data-testid="question-area" questions={questions}/>
      )}
    </Box>
  );
}

export default Game;
