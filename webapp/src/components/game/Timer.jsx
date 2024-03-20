import { useEffect, useState, useRef } from 'react';
import { CircularProgress, CircularProgressLabel, useColorModeValue} from '@chakra-ui/react'
import { Box} from "@chakra-ui/react";


export function Timer({ onTimeout, onReset, timeout = 30000 }) {
    const [timer, setTimer] = useState(null);
    const countRef = useRef(null);
    const [progress, setProgress] = useState(100); // Inicia el progreso en 100%

    const startTimer = () => {
        if (timer) clearTimeout(timer);
        setProgress(100);
        setTimer(setTimeout(() => {
        onTimeout();
        startTimer();
        }, timeout));
    };

    useEffect(() => {
        startTimer();
        return () => clearTimeout(countRef.current);
    }, []);

    useEffect(() => {
        onReset(startTimer);
    }, [onReset]);

    // Calcular el progreso restante del temporizador
    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = timeout - elapsedTime;
        const remainingProgress = (remainingTime / timeout) * 100;
        setProgress(remainingProgress > 0 ? remainingProgress : 0); // Evita valores negativos
        }, 1000); // Actualiza el progreso cada segundo

        return () => clearInterval(interval);
    }, [timeout]);

    return (
        <Box marginLeft="2em" marginTop="1em" marginBottom="1em">
        <CircularProgress value={progress} size="120px" >
        <CircularProgressLabel>{Math.ceil(progress / 100 * timeout / 1000)}s</CircularProgressLabel>
        </CircularProgress>
        </Box>
    );
}