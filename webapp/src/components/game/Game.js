import { QuestionArea } from './QuestionArea';
import { useEffect, useState,useContext, useRef } from 'react';
import { CircularProgress } from "@mui/material";
import {GameContext} from './GameContext';
import {useNavigate} from 'react-router-dom';
import { Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button,Center } from "@chakra-ui/react";
import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego */
function Game(darkMode) {

  const { startGame, questions, isLoading } = useContext(GameContext);
  const [isOpen, setIsOpen] = useState(false);//es el cuadro de dialogo que se abre al finalizar el juego

  //e le pasaran al Question area para que cuando acabe el juego tengan el valor de las respuestas correctas 
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const timeToAnswer = 20000;//Aquí podemos definir el tiempo para responder


  useEffect(() => {
    startGame();
  }, []);

  //se ejecuta al cambiar el num de correctas que solo cambia si se ha terminado el juego 
  useEffect(()=>{
    if(finished&&localStorage.getItem('username')!=null){//tienes que estar logeado para guardar el historial
      const data={
        user:localStorage.getItem('username'),
        correctas:correctAnswers,
        incorrectas:incorrectAnswers,
        tiempoTotal:999
      };


      console.log("hola se ha enviado el hisotrial al servidor con los datos" ,data);
      fetch(`${apiEndpoint}/updateHistory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        setIsOpen(true); // Hacer que aparezca el cuadro de diálogo
    })
    .catch(error => {
        console.error('Error al enviar el historial al servidor:', error);
        // Manejar el error si es necesario
    });
    

      setIsOpen(true);//hacer que aparzca el cuadro de dialogo 
     
    }
  },[setFinished,correctAnswers,incorrectAnswers])

  const onClose=()=>{
    setIsOpen(false);
    navigate('/home');
  }
  //Colores chakra dark - light
  console.log("En game"+darkMode.darkMode);
  let backgroundColorFirst= darkMode.darkMode? '#08313A' : '#FFFFF5';
  let backgroundColorSecond= darkMode.darkMode? '#107869' : '#FDF4E3';
  //#08313A, #107869

  return (
    <Box minH="100vh" minW="100vw" 
      bgGradient={`linear(to-t, ${backgroundColorFirst}, ${backgroundColorSecond})`}
      display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
         <CircularProgress color="inherit" />

      ) : (
        <QuestionArea darkMode={darkMode} data-testid="question-area" questions={questions} setTotalCorrectAnswers={setCorrectAnswers}
        setTotalIncorrectAnswers={setIncorrectAnswers} setFinished={setFinished} timeToAnswer={timeToAnswer}/>
      )}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Resultados:
            </AlertDialogHeader>
          <AlertDialogBody fontSize='lg' fontWeight='italic'>
            <Center>
              respuestas correctas: {correctAnswers} <br/>
              respuestas incorrectas: {incorrectAnswers}
            </Center>
          </AlertDialogBody>

          <AlertDialogFooter>

            <Button onClick={onClose} colorScheme="green" ml={3}>
              Cerrar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </Box>
  );
}

export default Game;
