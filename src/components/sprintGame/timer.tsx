import { FC, useState, useEffect } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

interface Props {
  toResults: () => void;
}

const Timer: FC<Props> = (props) => {
  const { toResults } = props;
  const [seconds, setSeconds] = useState(30);
  const [value, setValue] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(value - (100 / 30));
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds <= 0) {
      clearTimeout(timer);
      toResults();
    }
  }, [seconds, toResults]);

  return (
    <CircularProgress color="orange" value={value} size="120px">
      <CircularProgressLabel color="orange" fontSize="38px">
        {seconds}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
