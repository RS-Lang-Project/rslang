import { FC, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  Flex,
  Image,
  Grid,
} from '@chakra-ui/react';
import { Word } from '../../requests/requestTypes';
import headphones from '../../assets/svg/headphones.svg';
import { MAIN_LINK } from '../../requests/serverRequests';
import '../../styles/audioMain.css';

interface Props {
  words: Array<Word> | [];
  toResults: () => void;
  trueAnswers: Array<number>;
  setTrueAnswers: (arr: Array<number>) => void;
  falseAnswers: Array<number>;
  setFalseAnswers: (arr: Array<number>) => void;
}

const AudioMain: FC<Props> = (props) => {
  const {
    words,
    toResults,
    trueAnswers,
    setTrueAnswers,
    falseAnswers,
    setFalseAnswers,
  } = props;
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState(createRandomArray(3, 0, words.length, count));
  const [CheckYourAnswer, setCheckYourAnswer] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setTrueAnswers([]);
    setFalseAnswers([]);
    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.audioBtns')) {
        const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.audioBtns');
        if (e.code === 'Digit1') {
          btns[0].click();
        } else if (e.code === 'Digit2') {
          btns[1].click();
        } else if (e.code === 'Digit3') {
          btns[2].click();
        } else if (e.code === 'Digit4') {
          btns[3].click();
        } else if (e.code === 'Space') {
          (document.querySelector('.dontKnow') as HTMLButtonElement).click();
        }
      }
    });
  }, []);

  useEffect(() => {
    setAnswers(createRandomArray(3, 0, words.length, count));

    new Audio(`${MAIN_LINK}/${words[count].audio}`).play();
  }, [count]);

  function createRandomArray(length: number, min: number, max: number, trueAnswer: number) {
    const rand = () => Math.floor(Math.random() * (max - min) + min);
    const values = [trueAnswer];
    let value: number;
    for (let i = length; i > 0; i -= 1) {
      value = rand();
      if (values.indexOf(value) !== -1) {
        i += 1;
      } else {
        values.push(value);
      }
    }
    return values.sort(() => Math.random() - 0.5);
  }

  function nextQuestion() {
    if (count >= words.length - 1) {
      toResults();
    } else {
      setCount(count + 1);
    }
  }

  function checkTrueAnswer(word: string) {
    if (word === words[count].wordTranslate) {
      setCheckYourAnswer((
        <Text m="5px" fontWeight="bold" color="green">
          {`Правильно! ${words[count].word} - ${words[count].wordTranslate}`}
        </Text>
      ));
      setTrueAnswers([...trueAnswers, count]);
    } else {
      setCheckYourAnswer((
        <Text m="5px" fontWeight="bold" color="red">
          {`Упс.. У вас ошибка в слове ${words[count].word}`}
        </Text>
      ));
      setFalseAnswers([...falseAnswers, count]);
    }

    nextQuestion();
  }

  return (
    <Box color="white" h="100vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Text fontWeight="bold" fontSize="32px">
            {` ${count + 1}`}
            /
            {words.length}
          </Text>
          <Text mt="5px" fontWeight="bold" fontSize="28px">
            Правильных ответов:
            {` ${trueAnswers.length}`}
          </Text>
          <Flex
            direction="column"
            background="white"
            border="1px solid #000"
            borderRadius="10px"
            p="10px"
            m="20px 10px 10px 10px"
            minW="420px"
          >
            <Box fontSize="20px" color="#000">
              <Box
                m="0 auto"
                className="audio__play"
                cursor="pointer"
                borderRadius="100%"
                w="64px"
                h="64px"
                background="grey"
                onClick={() => { new Audio(`${MAIN_LINK}/${words[count].audio}`).play(); }}
              >
                <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                  <Image w="32px" h="32px" src={`${headphones}`} />
                </Flex>
              </Box>
            </Box>
            <Grid
              m="15px auto 15px auto"
              w="300px"
              gridTemplateColumns="auto auto"
              gridTemplateRows="auto auto"
              gap="10px"
            >
              <Button
                className="audioBtns"
                colorScheme="orange"
                variant="solid"
                onClick={() => checkTrueAnswer(words[answers[0]].wordTranslate)}
              >
                1:
                {` ${words[answers[0]].wordTranslate}`}
              </Button>
              <Button
                className="audioBtns"
                colorScheme="orange"
                variant="solid"
                onClick={() => checkTrueAnswer(words[answers[1]].wordTranslate)}
              >
                2:
                {` ${words[answers[1]].wordTranslate}`}
              </Button>
              <Button
                className="audioBtns"
                colorScheme="orange"
                variant="solid"
                onClick={() => checkTrueAnswer(words[answers[2]].wordTranslate)}
              >
                3:
                {` ${words[answers[2]].wordTranslate}`}
              </Button>
              <Button
                className="audioBtns"
                colorScheme="orange"
                variant="solid"
                onClick={() => checkTrueAnswer(words[answers[3]].wordTranslate)}
              >
                4:
                {` ${words[answers[3]].wordTranslate}`}
              </Button>
            </Grid>
          </Flex>
          {CheckYourAnswer !== null ? CheckYourAnswer : ''}
          <Button
            className="dontKnow"
            colorScheme="red"
            variant="solid"
            onClick={() => {
              setCheckYourAnswer((
                <Text m="5px" fontWeight="bold" color="red">
                  {`Упс.. У вас ошибка в слове ${words[count].word}`}
                </Text>
              ));
              setFalseAnswers([...falseAnswers, count]);
              nextQuestion();
            }}
          >
            Я не знаю :(
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default AudioMain;
