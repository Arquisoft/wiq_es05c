import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa';



export function GameTimer({darkMode, isGameEnded, setTotalTime }) {
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

  let textColor = darkMode.darkMode? "#FCFAF0" : "#08313A";

  return (
    <Box display="flex" alignItems="baseline">
        <Box display="flex" alignItems="center" margin="1em">
            <FaRegClock style={{ marginRight: "1em", color:textColor}} size="2em" />
            <Text color={textColor} fontSize="1.3em"> {seconds} </Text>
        </Box>
    </Box>
  );
}