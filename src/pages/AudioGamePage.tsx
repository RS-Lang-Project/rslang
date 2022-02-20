import { FC, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Image,
} from '@chakra-ui/react';
import AudioStart from '../components/audioGame/audioStart';
import AudioMain from '../components/audioGame/audioMain';
import Results from '../components/audioGame/results';
import fullScreen from '../assets/svg/fullScreen.svg';
import '../styles/fullScreen.css';
import { getAllWords } from '../requests/serverRequests';
import { Word } from '../requests/requestTypes';

const AudioGamePage: FC = () => {
  const [page, setPage] = useState('start');
  const [isReady, setIsReady] = useState(false);
  const [words, setWords] = useState<Array<Word>>([]);
  const [trueAnswers, setTrueAnswers] = useState<Array<number>>([]);
  const [falseAnswers, setFalseAnswers] = useState<Array<number>>([]);
  const [full, setFull] = useState(false);
  const [bestResult, setBestResult] = useState(0);
  let activeComponent: JSX.Element | undefined;

  useEffect(() => {
    setIsReady(false);
    const pathArr = document.location.pathname.match(/\d/g);
    const level: number = pathArr ? +pathArr[0] : 1;
    const currentPage: number = pathArr ? +pathArr[1] : 1;
    getAllWords(level - 1, currentPage - 1)
      .then((data: Array<Word>) => {
        setWords(() => data);
        setIsReady(true);
      });
  }, []);

  if (page === 'start') {
    activeComponent = (
      <AudioStart
        isReady={isReady}
        toMain={() => setPage('main')}
      />
    );
  } else if (page === 'main') {
    activeComponent = (
      <AudioMain
        words={words}
        toResults={() => setPage('results')}
        trueAnswers={trueAnswers}
        setTrueAnswers={(arr: Array<number>) => setTrueAnswers(arr)}
        falseAnswers={falseAnswers}
        setFalseAnswers={(arr: Array<number>) => setFalseAnswers(arr)}
        setBestResult={(n: number) => setBestResult(n)}
      />
    );
  } else if (page === 'results') {
    activeComponent = (
      <Results
        toMain={() => setPage('main')}
        trueAnswers={trueAnswers}
        falseAnswers={falseAnswers}
        words={words}
        bestResult={bestResult}
      />
    );
  }

  return (
    <Box
      className={full ? 'fullPage' : ''}
      overflow="hidden"
      bg="linear-gradient(rgb(127, 83, 172) 0%,rgb(100, 125, 238) 100%)"
    >
      <Container maxWidth="container.xl" position="relative">
        <Image
          cursor="pointer"
          w="32px"
          h="32px"
          src={`${fullScreen}`}
          position="absolute"
          top="20px"
          right="20px"
          className="fullScreen__trigger"
          onClick={() => {
            setFull(() => !full);
          }}
        />
        {activeComponent}
      </Container>
    </Box>
  );
};

export default AudioGamePage;
