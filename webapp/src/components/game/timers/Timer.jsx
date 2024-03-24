import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress, CircularProgressLabel, useColorModeValue } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";

export const Timer = React.memo(({darkMode,  onTimeout, timeout = 30000, resetTimer }) => {
    const [progress, setProgress] = useState(100); // Inicia el progreso en 100%
    const intervalRef = useRef(null);

    useEffect(() => {
        resetTimer.current = resetTimerFunction;
    }, []);

    useEffect(() => {
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = timeout - elapsedTime;
            const remainingProgress = (remainingTime / timeout) * 100;
            setProgress(remainingProgress > 0 ? remainingProgress : 0);
            if (remainingProgress <= 0) {
                clearInterval(intervalRef.current);
                onTimeout();
            }
        }, 1000); // Actualiza el progreso cada segundo

        return () => clearInterval(intervalRef.current);
    }, [timeout, onTimeout]);

    const resetTimerFunction = () => {
        clearInterval(intervalRef.current);
        setProgress(100);
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = timeout - elapsedTime;
            const remainingProgress = (remainingTime / timeout) * 100;
            setProgress(remainingProgress > 0 ? remainingProgress : 0);
            if (remainingProgress <= 0) {
                clearInterval(intervalRef.current);
                onTimeout();
            }
        }, 1000); // Actualiza el progreso cada segundo
    };

    const color = useColorModeValue(
        progress > 66.6 ? "green.400" : progress > 33.3 ? "orange.400" : "red.400",
        progress > 66.6 ? "green.500" : progress > 33.3 ? "orange.500" : "red.500"
    );

    let textColor = darkMode.darkMode? "#FCFAF0" : "#08313A";

    return (
        <Box marginLeft="2em" marginTop="1em" marginBottom="1em">
            <CircularProgress value={progress} size="120px" color={color}>
                <CircularProgressLabel color={textColor}>{Math.ceil(progress / 100 * timeout / 1000)}s</CircularProgressLabel>
            </CircularProgress>
        </Box>
    );
});
