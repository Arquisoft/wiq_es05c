import {Center } from "@chakra-ui/react";


export function EnunciadoBlock({pregunta}){

    return(
        <Center fontSize="1.5em" 
        color="#FCFAF0" fontWeight="bolder"flex="2">
            {pregunta}
        </Center>
    )
}