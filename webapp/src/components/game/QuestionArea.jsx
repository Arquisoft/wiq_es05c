import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box} from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';
import { Timer } from './Timer';


export function QuestionArea(){

  const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';
    // Estado para almacenar los datos de la pregunta
  const [questionJson, setQuestionData] = useState(null);
    // Estado para almacenar las respuestas
  const [respuestas, setRespuestas] = useState([]);
  // Estado que almacena la correcta
  const [correcta, setCorrecta] = useState();

    // Función para llamar al servicio y obtener los datos de la pregunta
  

      // Llamar al servicio al cargar el componente (equivalente a componentDidMount)
      useEffect(() => {
        const fetchQuestionData = async () => {
          try {          
              // Llamada al servicio para obtener los datos de la pregunta (aquí asumiendo que el servicio devuelve un JSON)
              const response = await axios.get(`${apiEndpoint}/getQuestion`);
              const data = response.data;
              setQuestionData(data); // Actualizar el estado con los datos de la pregunta obtenidos del servicio
              //Meto la correcta
              setCorrecta(data.correcta);
              //calcular respuestas 
              const respuestasArray = [data.correcta, data.respuestasIncorrecta1, data.respuestasIncorrecta2, data.respuestasIncorrecta3];
              setRespuestas(respuestasArray);
          
            } catch (error) {
              console.error('Error fetching question data:', error);
          }
      };

        fetchQuestionData();
    }, [apiEndpoint]); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

/** PARA DEPURACIÓN Y LOCAL
useEffect(() => {
  const dataDev = {
    "pregunta": "What is the capital of France?",
    "correcta": "Paris",
    "respuestasIncorrecta1": "London",
    "respuestasIncorrecta2": "Berlin",
    "respuestasIncorrecta3": "Madrid"
  };

  // Simulación de la obtención de datos de pregunta
  const enunciadoDev = dataDev;
  const respuestasDev = [dataDev.correcta, dataDev.respuestasIncorrecta1, dataDev.respuestasIncorrecta2, dataDev.respuestasIncorrecta3];
  const correctaDev = dataDev.correcta;

  // Establecer los datos de pregunta y respuestas
  setQuestionData(enunciadoDev);
  setRespuestas(respuestasDev);
  setCorrecta(correctaDev);
}, []);
*/

  //Para el reloj reeiniciar (Cuando acertemos)
  const handleReset = (startTimer) => {
    startTimer();
  };
  //Este cuando quedemos sin tiempo (perder)
  const handleTimeout = () => {
    //alert("Te quedaste sin tiempo jopelines :'c");
  };

    return(
        <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
        maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
          {questionJson ? ( // Verificar si se han obtenido los datos de la pregunta
                <>
                  <Box display="flex" borderBottom="0.1em solid #000">
                    <Timer onTimeout={handleTimeout} onReset={handleReset} timeout={30000} />
                    <EnunciadoBlock pregunta={questionJson.pregunta}/> {/* Renderizar el enunciado de la pregunta */}
                  </Box>
                    <AnswersBlock correcta={correcta} respuestas={respuestas}/> {/* Renderizar las respuestas de la pregunta */}
                    <p>Hola</p>
                </>
            ) : (
              <>
              <p>Cargando...</p> {/* Mensaje de carga mientras se obtienen los datos */}
             </>
            )}
        </Box>
    )
}