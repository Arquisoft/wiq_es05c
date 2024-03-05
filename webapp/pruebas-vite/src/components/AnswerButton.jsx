import {Button} from '@chakra-ui/react'

export function AnswerButton({text, colorFondo}){

    return(
        <Button 
        bg={colorFondo}
        color="#FCFAF0"
        display="flex"
        fontSize="2em"
        borderRadius="15px"
        fontStyle="bold"
        transition="0.3s"
        _hover={{
            transform:"scale(1.05)",
        }}
        >
        {text}</Button>    
    )
}