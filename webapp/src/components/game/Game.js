import { QuestionArea } from './QuestionArea';
import { useEffect, useState,useContext } from 'react';
import { CircularProgress } from "@mui/material";
import {GameContext} from './GameContext';
import {useNavigate} from 'react-router-dom';
import { Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button,Center } from "@chakra-ui/react";

/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego
recibe questions que son las del servidor si estas en multiplayer 
  si no le pasa contexto se utiliziara el por defecto que es el GameContext
*/
function Game({questions:multiplayerQuestions,endGame}) {

  //obtienes las preguntas del contexto o bien de la prop q se le pasa 
  const { startGame, questions: singleplayerQuestions, isLoading } = useContext(GameContext);
  const questions = multiplayerQuestions || singleplayerQuestions;
 
  const [isOpen, setIsOpen] = useState(false);//es el cuadro de dialogo que se abre al finalizar el juego

  //e le pasaran al Question area para que cuando acabe el juego tengan el valor de las respuestas correctas 
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();


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
     // axios.post(`${apiEndpoint}/historyAdd`, data);
    

      setIsOpen(true);//hacer que aparzca el cuadro de dialogo 

      //comprobar si es mnultiplayer y si lo es se enviara al servidor que se ha finalizado el juego
      if(multiplayerQuestions!=null){
        endGame(data);
      }
     
    }
  },[setFinished,correctAnswers,incorrectAnswers])

  const onClose=()=>{
    setIsOpen(false);
    navigate('/home');
  }
  return (
    <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
         <CircularProgress color="inherit" />

      ) : (
        <QuestionArea data-testid="question-area" questions={questions}       setTotalCorrectAnswers={setCorrectAnswers}
        setTotalIncorrectAnswers={setIncorrectAnswers} setFinished={setFinished}/>
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
