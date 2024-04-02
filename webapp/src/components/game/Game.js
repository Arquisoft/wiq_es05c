import { QuestionArea } from './QuestionArea';
import { useEffect, useState,useContext } from 'react';
import {GameContext} from './GameContext';
import {useNavigate} from 'react-router-dom';
import { Spinner, Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button,Center } from "@chakra-ui/react";

const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

/*
recibe el obj gameMode que contieene las preguntas para ese modo de juego
recibe questions que son las del servidor si estas en multiplayer 
  si no le pasa contexto se utiliziara el por defecto que es el GameContext
*/
function Game({darkMode,questions:multiplayerQuestions=null,endGame=null}) {

  //obtienes las preguntas del contexto o bien de la prop q se le pasa 
  const { startGame, questions: singleplayerQuestions, isLoading } = useContext(GameContext);
  const questions = multiplayerQuestions || singleplayerQuestions;
 
  const [isOpen, setIsOpen] = useState(false);//es el cuadro de dialogo que se abre al finalizar el juego

  //e le pasaran al Question area para que cuando acabe el juego tengan el valor de las respuestas correctas 
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const timeToAnswer = 20000;//Aquí podemos definir el tiempo para responder


  useEffect(() => {
    startGame();
  }, []);

  //se ejecuta al cambiar el num de correctas que solo cambia si se ha terminado el juego 
  useEffect(()=>{
    if(finished&&localStorage.getItem('username')!=null && totalTime != 0){//tienes que estar logeado para guardar el historial
      const data={
        user:localStorage.getItem('username'),
        correctas:correctAnswers,
        incorrectas:incorrectAnswers,
        tiempoTotal:totalTime
      };

      console.log("See envian los siguientes datos al historial" ,data);
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

      //comprobar si es mnultiplayer y si lo es se enviara al servidor que se ha finalizado el juego
      if(multiplayerQuestions!=null){
        endGame(data);
      }
     
    }
  },[setFinished,correctAnswers,incorrectAnswers, totalTime])

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
        <QuestionArea darkMode={darkMode} data-testid="question-area" questions={questions} setTotalCorrectAnswers={setCorrectAnswers}
        setTotalIncorrectAnswers={setIncorrectAnswers} setFinished={setFinished} setTotalTimeFinish={setTotalTime} timeToAnswer={timeToAnswer}/>
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
