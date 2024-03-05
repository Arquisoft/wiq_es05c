import './App.css';
import { AnswerButton } from './components/AnswerButton.jsx';
import { Box,Center } from "@chakra-ui/react";


export function App() {
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t,#08313A,#107869)"
      display="flex" justifyContent="center" alignItems="center">
        <Box alignContent="center" bg="#0000004d" 
        maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
          <Center borderBottom="0.1em solid #000" 
            height="3">
              Pregunta
          </Center>
          <Box>
            <AnswerButton text={"Primera pregunta"} colorFondo={"#A06AB4"}/>
            <AnswerButton text={"Segunda pregunta"} colorFondo={"#B5EECB"}/>
            <AnswerButton text={"Tercera pregunta"} colorFondo={"#FFD743"}/>
            <AnswerButton text={"Cuarta pregunta"} colorFondo={"#D773A2"}/>
          </Box>
        </Box>
      </Box>
    </>
  )
}