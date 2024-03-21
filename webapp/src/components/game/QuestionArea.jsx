import { useEffect, useState,useRef  } from 'react';
import { Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';
import { Timer } from './Timer';

/*
*maneja la logica general del juego  reincia el contador del timepo salta de pregunas etc,
cuando el juego termina actualiza las respuestas correctas e incorrectas y se las apsas a game con prop Drilling */

export function QuestionArea({questions,setTotalCorrectAnswers, setTotalIncorrectAnswers,setFinished}){
  const [questionIndex, setQuestionIndex] = useState(0); // Nuevo estado para el índice de la pregunta
  // Estado para almacenar los datos de la pregunta
  const [questionData, setQuestionData] = useState(null); // Estado para almacenar los datosS de la pregunta
  // Estado para almacenar las respuestas
  const [respuestas, setRespuestas] = useState([]);
  // Estado que almacena la correcta
  const [correcta, setCorrecta] = useState();
  const [open, setOpen] = useState(false); // Nuevo estado para controlar si el diálogo está abierto o cerrado
  const [correctAnswers, setCorrectAnswers] = useState(0); // Nuevo estado para llevar la cuenta de las respuestas correctas
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); // Nuevo estado para llevar la cuenta de las respuestas incorrectas

  const[isGameEnded, setIsGameEnded] = useState(false); // Nuevo estado para controlar si el juego ha terminado o no
  const resetTimer = useRef(null); // Ref para almacenar la función resetTimer


  // Función para obtener los datos de la pregunta
  const fetchQuestionData = () => {
    try {
      console.log("Array de preguntas en el juego: ", questions);
      // Obtener los datos de la pregunta del array de preguntas
      const data = questions[questionIndex]; // Usar el índice de la pregunta para obtener la pregunta actual
      setQuestionData(data); // Actualizar el estado con los datos de la pregunta obtenidos del array
      //Meto la correcta
      setCorrecta(data.correcta);
      //calcular respuestas 
      const respuestasArray = [data.correcta, data.respuestasIncorrecta1, data.respuestasIncorrecta2, data.respuestasIncorrecta3];
      setRespuestas(respuestasArray);
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

     // Llamar a la función al cargar el componente y cuando cambie el índice de la pregunta
  useEffect(() => {
    fetchQuestionData();
  }, [questionIndex]);

  //se lanza si se acaba el juego 
  useEffect(()=>{
    //como esto se lanza cada que se actiliza tb cuando se pone a false solamente guardas el historial al ser true 
    if(isGameEnded){
      //alert("Has terminado el juego, has acertado "+correctAnswers+" preguntas y has fallado "+incorrectAnswers+" preguntas");
      setOpen(true);
      setTotalCorrectAnswers(correctAnswers);
      setTotalIncorrectAnswers(incorrectAnswers);
      setFinished(true);
      
    }
   
  },[isGameEnded])
  // Función para manejar cuando se selecciona una respuesta
  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    else{
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    Finish();
    
  };
  /*
  comprueba si terminaste el juego y si no es así, pasa a la siguiente pregunta */
  const Finish = () => {
    if(questionIndex===questions.length-1)
    {
      //poner a true el estado de juego terminado y ademas parar el reloj 
      setIsGameEnded(true);

       


    }else
    {
      loadNextQuestion();
    }
    };

  // Función para cargar la siguiente pregunta
  const loadNextQuestion = () => {
    //poes el indice en la nueva preggunta y actualizas el valor de la pregunta actual 
    setQuestionIndex(questionIndex+1);
    fetchQuestionData();//obtener la siguiente pregunnta 
   
    
    
  };


  //Este cuando quedemos sin tiempo (perder)
  const handleTimeout = () => {
    Finish();
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(
        <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
        maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
          
                  <Box display="flex" borderBottom="0.1em solid #000">
                  <Timer onTimeout={handleTimeout} resetTimer={resetTimer} timeout={30000} />
                    <EnunciadoBlock pregunta={questionData?.pregunta} />
                  </Box>
                  <AnswersBlock respuestas={respuestas} correcta={correcta} onAnswerSelect={handleAnswerSelect} isGameEnded={isGameEnded} />
                 
              
       
           
        </Box>
    )
}