import { QuestionArea } from './QuestionArea';
import { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { Spinner, Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button,Center } from "@chakra-ui/react";
import BasicGame from './BasicGame';
const apiEndpoint = process.env.REACT_APP_API_URI ||'http://localhost:8000';

function Game({darkMode,gameMode= new BasicGame()}) {
  const [isOpen, setIsOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();
  const timeToAnswer = gameMode.timeToAnswer;
  
  const [isFinished, setIsFinished] = useState(false);
  const[isLoading,setIsLoading]=useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const gameModeRef = useRef(gameMode);

  useEffect(() => {
    const startGameAsync = async () => {
      setIsLoading(true);
      await gameMode.startGame();
      console.log('preguntas', gameMode.questions);
  
      const currentQuestion = gameMode.getCurrentQuestion();
      console.log('primera pregunta ', currentQuestion);
  
      setCurrentQuestion(currentQuestion);
      setIsLoading(false);
  
      gameModeRef.current = gameMode;
    };
  
    startGameAsync();
  }, []);

  useEffect(() => {
    const startGameAsync = async () => {
      setIsLoading(true);
      await gameModeRef.current.startGame();
      console.log('preguntas', gameModeRef.current.questions);

      const currentQuestion = gameModeRef.current.getCurrentQuestion();
      console.log('primera pregunta ', currentQuestion);

      setCurrentQuestion(currentQuestion);
      setIsLoading(false);
    };

    startGameAsync();
  }, []);

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  useEffect(() => {
    //console.log('corectAnswer useEffect el valor de las preguntas es ',gameModeRef.questions);
    console.log("entra en el useEffect de correctAnswer",correctAnswers,incorrectAnswers,gameModeRef.current.questions.length);
    
    if ( !isFinished && correctAnswers + incorrectAnswers < gameModeRef.current.questions.length ) { //para que no entre en el finished nada mas cargar el juegu
      console.log("entra en el if del correctAnswer");
      const nextQuestion = gameModeRef.current.nextQuestion();
      setCurrentQuestion(nextQuestion);
    } else if(gameModeRef.current.questions.length != 0){ //no deberia entrar cuando se cargue el componente
      console.log("use effect finish");
      gameModeRef.current.finishGame();
      setIsFinished(true);
    }
  }, [correctAnswers, incorrectAnswers]);

  useEffect(() => {
    console.log("entra en el useEffect del finished");
    console.log('valores de IsGameEnded y totalTime',gameModeRef.current.isGameEnded,totalTime)
    if (gameModeRef.current.isGameEnded &&localStorage.getItem('username') != null && totalTime != 0) {
      const data = {
        correctas: correctAnswers,
        incorrectas: incorrectAnswers,
        tiempoTotal: totalTime
      };

      gameMode.sendHistory(data)
        .then(() => {
          console.log('Historial enviado correctamente');
        })
        .catch(error => {
          console.error('Error al enviar el historial al servidor:', error);
        });
        setIsOpen(true);
    }
  }, [totalTime,gameModeRef.current.isGameEnded]);

  const onClose=()=>{
    setIsOpen(false);
    navigate('/home');
  }

  const handleTimeout = () => {
    handleAnswerSelect(false);
  };
  
  let backgroundColorFirst= darkMode.darkMode? '#08313A' : '#FFFFF5';
  let backgroundColorSecond= darkMode.darkMode? '#107869' : '#FDF4E3';

  return (
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
       />
    ) : (
      <QuestionArea 
      darkMode={darkMode} 
      data-testid="question-area" 
      question={currentQuestion} 
      setTotalCorrectAnswers={setCorrectAnswers}
      setTotalIncorrectAnswers={setIncorrectAnswers} 
      isFinished={isFinished}
      setTotalTime={setTotalTime} 
      timeToAnswer={timeToAnswer}
      onAnswerSelect={handleAnswerSelect}
      handleTimeout={handleTimeout}
      

    />
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