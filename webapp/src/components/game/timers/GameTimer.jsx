import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa';



export function GameTimer({ isGameEnded, setTotalTime }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isGameEnded) {
      setTotalTime(seconds);
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isGameEnded, seconds, setTotalTime]);

  return (
    <Box display="flex" alignItems="baseline">
        <Box display="flex" alignItems="center" margin="1em">
            <FaRegClock style={{ marginRight: "1em", color:"white"}} size="2em" />
            <Text color="white" fontSize="1.3em"> {seconds} </Text>
        </Box>
    </Box>
  );
}