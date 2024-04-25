import {Button} from '@chakra-ui/react'

export function AnswerButton({darkMode, indexx, text, colorFondo, onClick}){

    let textColor = darkMode.darkMode? "#FCFAF0" : "#08313A";

    return(
        <Button  id={"buttonAnswer" + indexx}
        bg={colorFondo}
        color={textColor}
        display="flex"
        fontSize="1.3em"
        borderRadius="15px"
        transition="0.3s"
        minHeight="4em"
        whiteSpace="normal" // Agrega esta línea
        wordWrap="break-word" // Agrega esta línea
  
        _hover={{
            transform:"scale(1.05)",
        }}
        onClick = {onClick}
        >
        {text}</Button>    
    )
}