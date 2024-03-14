import {Center } from "@chakra-ui/react";


export function EnunciadoBlock({pregunta}){

    return(
        <Center borderBottom="0.1em solid #000" fontSize="1.5em" 
        color="#FCFAF0" fontWeight="bolder"flex="2">
            {pregunta}
        </Center>
    )
}