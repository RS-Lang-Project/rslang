import { FC, useState } from 'react';
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
}

const SprintMain: FC<Props> = (props) => {
  const { words } = props;
  const [score, setScore] = useState(0);
  const [plusScore, setPlusScore] = useState(10);
  const [count, setCount] = useState(0);
  const [queue, setQueue] = useState(0);
  let isTrueAnswer = false;

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
    } else {
      setQueue(0);
      setPlusScore(10);
    }

    if (count >= words.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function checkFlseAnswer() {
    if (!isTrueAnswer) {
      setScore(score + plusScore);
      if (queue >= 3) {
        setQueue(1);
        setPlusScore(plusScore + 10);
      } else {
        setQueue(queue + 1);
      }
    } else {
      setQueue(0);
      setPlusScore(10);
    }

    if (count >= words.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <Box color="white" h="90vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Text fontWeight="bold" fontSize="32px">
            You score:
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
                colorScheme="green"
                variant="solid"
                onClick={() => checkTrueAnswer()}
              >
                Правильно
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={() => checkFlseAnswer()}
              >
                Неправильно
              </Button>
            </Flex>
          </Flex>
          <Timer />
        </Flex>
      </Center>
    </Box>
  );
};

export default SprintMain;
