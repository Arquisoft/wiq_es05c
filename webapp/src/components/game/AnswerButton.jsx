import {Button} from '@chakra-ui/react'

export function AnswerButton({text, colorFondo, onClick}){

    return(
        <Button 
        bg={colorFondo}
        color="#FCFAF0"
        display="flex"
        fontSize="1.3em"
        borderRadius="15px"
        transition="0.3s"
        minHeight="4em"
        _hover={{
            transform:"scale(1.05)",
        }}
        onClick = {onClick}
        >
        {text}</Button>    
    )
}