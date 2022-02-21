import { FC, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';
import Answers from './answers';
import Timer from './timer';
import { Word } from '../../requests/requestTypes';

interface Props {
  words: Array<Word> | [];
  toResults: () => void;
  trueAnswers: Array<number>;
  setTrueAnswers: (arr: Array<number>) => void;
  falseAnswers: Array<number>;
  setFalseAnswers: (arr: Array<number>) => void;
  setBestResult: (n: number) => void;
}

const SprintMain: FC<Props> = (props) => {
  const {
    words,
    toResults,
    trueAnswers,
    setTrueAnswers,
    falseAnswers,
    setFalseAnswers,
    setBestResult,
  } = props;
  const [score, setScore] = useState(0);
  const [plusScore, setPlusScore] = useState(10);
  const [count, setCount] = useState(0);
  const [queue, setQueue] = useState(0);
  const [counter, setCounter] = useState(0);
  const [bestCounter, setBestCounter] = useState(0);
  let isTrueAnswer = false;

  useEffect(() => {
    setTrueAnswers([]);
    setFalseAnswers([]);
    setCounter(0);
    setBestResult(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector('.sprintBtns')) {
        const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.sprintBtns');
        if (e.code === 'ArrowLeft') {
          btns[0].click();
        } else if (e.code === 'ArrowRight') {
          btns[1].click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function getRandomIntInclusive(minimum: number, maximum: number) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomTranslate() {
    const roundArr = [count, getRandomIntInclusive(0, words.length - 1)];
    let value;
    if (getRandomIntInclusive(0, 1)) {
      isTrueAnswer = true;
      value = 0;
    } else {
      isTrueAnswer = false;
      value = 1;
    }
    return roundArr[value];
  }

  function checkTrueAnswer() {
    if (isTrueAnswer) {
      setScore(score + plusScore);
      if (queue >= 3) {
        setQueue(1);
        setPlusScore(plusScore + 10);
      } else {
        setQueue(queue + 1);
      }
      setTrueAnswers([...trueAnswers, count]);
      setCounter(counter + 1);
      if (counter >= bestCounter) {
        setBestCounter(counter + 1);
      }
    } else {
      setQueue(0);
      setPlusScore(10);
      setFalseAnswers([...falseAnswers, count]);
      if (counter >= bestCounter) {
        setBestCounter(counter);
      }
      setCounter(0);
    }

    if (count >= words.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function checkFalseAnswer() {
    if (!isTrueAnswer) {
      setScore(score + plusScore);
      if (queue >= 3) {
        setQueue(1);
        setPlusScore(plusScore + 10);
      } else {
        setQueue(queue + 1);
      }
      setTrueAnswers([...trueAnswers, count]);
      setCounter(counter + 1);
      if (counter >= bestCounter) {
        setBestCounter(counter + 1);
      }
    } else {
      setQueue(0);
      setPlusScore(10);
      setFalseAnswers([...falseAnswers, count]);
      if (counter >= bestCounter) {
        setBestCounter(counter);
      }
      setCounter(0);
    }

    if (count >= words.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <Box color="white" h="91vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Text fontWeight="bold" fontSize="32px">
            Ваш результат:
            {` ${score}`}
          </Text>
          <Text mt="5px" fontWeight="bold" fontSize="28px">
            +
            {` ${plusScore}`}
          </Text>
          <Answers queue={queue} />
          <Flex
            direction="column"
            background="white"
            border="1px solid #000"
            borderRadius="10px"
            p="10px"
            m="20px 10px 10px 10px"
            minW="420px"
          >
            <Text fontSize="20px" color="#000" align="center">
              {`${words[count]?.word} `}
              -
              {` ${words[getRandomTranslate()]?.wordTranslate}`}
            </Text>
            <Flex m="15px auto 15px auto" w="300px" justifyContent="space-around">
              <Button
                className="sprintBtns"
                colorScheme="green"
                variant="solid"
                onClick={() => checkTrueAnswer()}
              >
                Правильно
              </Button>
              <Button
                className="sprintBtns"
                colorScheme="red"
                variant="solid"
                onClick={() => checkFalseAnswer()}
              >
                Неправильно
              </Button>
            </Flex>
          </Flex>
          <Timer
            setBestResult={() => setBestResult(bestCounter)}
            toResults={() => toResults()}
          />
        </Flex>
      </Center>
    </Box>
  );
};

export default SprintMain;
