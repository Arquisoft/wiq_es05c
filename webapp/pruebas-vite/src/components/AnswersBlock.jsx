import { Box } from "@chakra-ui/react";
import { AnswerButton } from './AnswerButton.jsx';

export function AnswersBlock(){

    return(
        <Box display="grid" flex="1" gridTemplateColumns="repeat(2,1fr)" 
        gridColumnGap="2em" padding="4em" alignItems="center">
            <AnswerButton text={"Primera pregunta"} colorFondo={"#A06AB4"}/>
            <AnswerButton text={"Segunda pregunta"} colorFondo={"#B5EECB"}/>
            <AnswerButton text={"Tercera pregunta"} colorFondo={"#FFD743"}/>
            <AnswerButton text={"Cuarta pregunta"} colorFondo={"#D773A2"}/>
        </Box>
    )
}