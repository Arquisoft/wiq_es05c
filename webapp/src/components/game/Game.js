import { QuestionArea } from './QuestionArea';
import { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { Spinner, Box} from "@chakra-ui/react";
import BasicGame from './BasicGame';
import { useTranslation } from 'react-i18next';

function Game({darkMode,gameMode=new BasicGame()}) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();
  const timeToAnswer = gameMode.timeToAnswer;
  
  const [isFinished, setIsFinished] = useState(false);
  const[isLoading,setIsLoading]=useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const gameModeRef = useRef(gameMode);
  //para pasarle el idioma
  const { i18n } = useTranslation();

  useEffect(() => {
    const startGameAsync = async () => {
        // Restablece el estado del juego
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setIsFinished(false);

      setIsLoading(true);
      gameModeRef.current.idioma = i18n.language;
      gameModeRef.current.navigate = navigate;//le das la prop dinamicamente al obj 
      await gameModeRef.current.startGame();
      console.log('preguntas', gameModeRef.current.questions);
  
      console.log('gameMode',gameModeRef.current);
      const currentQuestion = gameModeRef.current.getCurrentQuestion();
      console.log('primera pregunta ', currentQuestion);
  
      setCurrentQuestion(currentQuestion);
      setIsLoading(false);
      //en caso de que la gateway devuelva un error , sacamos un alert y le decimos que cargue la pagina d enuevo 
      if(gameModeRef.current.questions.length===0){
        alert("Error al cargar las preguntas, por favor recargue la página");
       // navigate('/home');
      }
    };
  
    startGameAsync();
  }, [i18n.language, navigate]);//<-cambiar el array de depencias error despliegue 

 

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      gameModeRef.current.incrementCorrectas();
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
      gameModeRef.current.incrementIncorrectas();
    }

    console.log('comprobar si se pone a true el finished:preguntas tamaño,correctas e incorrecas ',gameModeRef.current.questions.length)
    
    if(correctAnswers+incorrectAnswers === gameModeRef.current.questions.length-1)
    //setIsFinished(true);
    setTotalTime(totalTime);
  };

  useEffect(() => {
    console.log("entra en el useEffect de correctAnswer",correctAnswers,incorrectAnswers,gameModeRef.current.questions.length,isFinished);
    
    if (correctAnswers + incorrectAnswers < gameModeRef.current.questions.length ) { 
      console.log("entra en el if del correctAnswer");
      const nextQuestion = gameModeRef.current.nextQuestion();
      setCurrentQuestion(nextQuestion);
    } else  if (gameModeRef.current.questions.length>0){//comprobar que no sea vacia para que le ljuego no finalize al empezar  
      console.log("use effect finish");
      setIsFinished(true);
      //poner el tiepo que tardo 
      console.log("tiempo total tardado en acabar ",totalTime);
      gameModeRef.current.setTiempoTotal(totalTime);
      gameModeRef.current.finishGame();
      gameModeRef.current.sendHistory({correctas: correctAnswers, incorrectas: incorrectAnswers, tiempoTotal: totalTime});
     }
      
    
  }, [correctAnswers, incorrectAnswers,totalTime, isFinished]);//<-cambiar el array de depencias error despliegue 

  const handleTimeout = () => {
    handleAnswerSelect(false);
  };
  
  let backgroundColorFirst= darkMode.darkMode? '#08313A' : '#A4E5E0';
  let backgroundColorSecond= darkMode.darkMode? '#107869' : '#A4E5E0';

  return (
    <Box minH="100vh" minW="100vw" 
    bgGradient={`linear(to-t, ${backgroundColorFirst}, ${backgroundColorSecond})`}
    display="flex" justifyContent="center" alignItems="center">
    {isLoading ? (
       <Spinner data-testid="loading-spinner"
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

    </Box>
  );
}

export default Game;