import { QuestionArea } from './QuestionArea';
import { useEffect, useState,useContext } from 'react';
import {GameContext} from './GameContext';
import {useNavigate} from 'react-router-dom';
import { Spinner, Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button,Center } from "@chakra-ui/react";
import BasicGame from './BasicGame';
const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego
recibe questions que son las del servidor si estas en multiplayer 
  si no le pasa contexto se utiliziara el por defecto que es el GameContext
*/
function Game({darkMode,gameMode= new BasicMode(),endGame=null}) {

  const [isOpen, setIsOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();
  const timeToAnswer = gameMode.timeToAnswer;

  // Utilizar el estado isGameEnded de gameMode en lugar de mantener un estado separado en Game
  const finished = gameMode.isGameEnded;


  

  //empiza el juego al cargar el componente
  useEffect(() => {
    gameMode.startGame();
  }, []);

  //se encarga de comprobar el estado del juego y si ha terminado llama al metodo history del modo de juego 
  useEffect(() => {
    if (finished && localStorage.getItem('username') != null && totalTime != 0) {
      const data = {
        correctas: correctAnswers,
        incorrectas: incorrectAnswers,
        tiempoTotal: totalTime
      };

      gameMode.sendHistory(data)
        .then(() => {
          setIsOpen(true);
          //enviar el fin del juego para que se reinicie el juego o te quites el socket 
         
          
        })
        .catch(error => {
          console.error('Error al enviar el historial al servidor:', error);
        });
        gameMode.endGame();//terminar el juego 
    }
  }, [finished, correctAnswers, incorrectAnswers, totalTime]);

  const onClose=()=>{
    setIsOpen(false);
    //solamente te iras si has cerrado el singleplayer en multiplayer no te vas hasta que no ves el ganador 
    if( multiplayerQuestions==null)
    navigate('/home');
  }
  //Colores chakra dark - light
  console.log("En game"+darkMode.darkMode);
  let backgroundColorFirst= darkMode.darkMode? '#08313A' : '#FFFFF5';
  let backgroundColorSecond= darkMode.darkMode? '#107869' : '#FDF4E3';
  //#08313A, #107869

  return (
    console.log("En game"+darkMode.darkMode),
    <Box minH="100vh" minW="100vw" 
      bgGradient={`linear(to-t, ${backgroundColorFirst}, ${backgroundColorSecond})`}
      display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
         <Spinner
         thickness='0.3em'
         speed='0.65s'
         emptyColor='gray.200'
         color='blue.500'
         size='xl'
         marginTop='5em'
         />//Para mientras carga

      ) : (
      
        <QuestionArea 
          darkMode={darkMode} 
          data-testid="question-area" 
          questions={gameMode.questions} 
          setTotalCorrectAnswers={setCorrectAnswers}
          setTotalIncorrectAnswers={setIncorrectAnswers} 
          setFinished={setFinished} 
          setTotalTimeFinish={setTotalTime} 
          timeToAnswer={timeToAnswer}
          nextQuestion={gameMode.nextQuestion}
        />
      )}
      

    {multiplayerQuestions ? (<div id="waitingForPlayers">
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
            <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Juego Terminado
            </AlertDialogHeader>

            <AlertDialogBody>
                Esperando al resto de jugadores...
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button colorScheme="blue" onClick={onClose} ml={3}>
                Cerrar
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
        </div>  ):(<AlertDialog isOpen={isOpen} onClose={onClose}>
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
    </AlertDialog>)}
    </Box>
  );
}

export default Game;
