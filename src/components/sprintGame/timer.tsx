import { FC } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const Timer: FC = () => {
  const seconds = 30;
  return (
    <CircularProgress color="orange" value={99} size="120px">
      <CircularProgressLabel color="orange" fontSize="38px">
        {seconds}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
