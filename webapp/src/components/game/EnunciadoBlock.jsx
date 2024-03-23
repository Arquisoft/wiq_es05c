import {Center } from "@chakra-ui/react";


export function EnunciadoBlock({darkMode, pregunta}){

    let textColor = darkMode.darkMode? "#FCFAF0" : "#08313A";

    return(
        <Center fontSize="1.5em" 
        color={textColor} fontWeight="bolder"flex="2">
            {pregunta}
        </Center>
    )
}