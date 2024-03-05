import './App.css';
import { AnswerButton } from './components/AnswerButton.jsx';
import { Box } from "@chakra-ui/react";


export function App() {
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t,#08313A,#107869)">
        <AnswerButton text={"Primera pregunta"} colorFondo={"#A06AB4"}/>
        <AnswerButton text={"Segunda pregunta"} colorFondo={"#B5EECB"}/>
        <AnswerButton text={"Tercera pregunta"} colorFondo={"#FFD743"}/>
        <AnswerButton text={"Cuarta pregunta"} colorFondo={"#D773A2"}/>
      </Box>
    </>
  )
}