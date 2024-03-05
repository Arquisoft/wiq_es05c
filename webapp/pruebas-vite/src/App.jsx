import './App.css';
import { Box} from "@chakra-ui/react";
import { QuestionArea } from './components/QuestionArea';


export function App() {
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t,#08313A,#107869)"
      display="flex" justifyContent="center" alignItems="center">
        <QuestionArea/>
      </Box>
    </>
  )
}