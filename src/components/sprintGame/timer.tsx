import { FC, useState } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const Timer: FC = () => {
  const [seconds, setSeconds] = useState(30);
  const [value, setValue] = useState(100);

  const timer = setTimeout(() => {
    setSeconds(seconds - 1);
    setValue(value - (100 / 30));
  }, 1000);

  if (seconds <= 0) {
    clearTimeout(timer);
    console.log('game over, show modal window');
  }

  return (
    <CircularProgress color="orange" value={value} size="120px">
      <CircularProgressLabel color="orange" fontSize="38px">
        {seconds}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
