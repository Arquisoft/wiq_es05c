import { Box} from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';

export function QuestionArea(){

    return(
        <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
        maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
          <EnunciadoBlock pregunta={"Pregunta"}/>
          <AnswersBlock/>
        </Box>
    )
}