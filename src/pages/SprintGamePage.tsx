import { FC, useState, useEffect } from 'react';
import {
  Box,
  Container,
} from '@chakra-ui/react';
import SprintStart from '../components/sprintGame/sprintStart';
import SprintMain from '../components/sprintGame/sprintMain';
import Results from '../components/sprintGame/results';
import { getAllWords } from '../requests/serverRequests';
import { Word } from '../requests/requestTypes';

const SprintGamePage: FC = () => {
  const [page, setPage] = useState('start');
  const [isReady, setIsReady] = useState(false);
  const [words, setWords] = useState<Array<Word>>([]);
  const [trueAnswers, setTrueAnswers] = useState<Array<number>>([]);
  const [falseAnswers, setFalseAnswers] = useState<Array<number>>([]);
  let activeComponent;

  useEffect(() => {
    setIsReady(false);
    const pathArr = document.location.pathname.match(/\d/g);
    const level: number = pathArr ? +pathArr[0] : 1;
    const correntPage: number = pathArr ? +pathArr[1] : 1;
    getAllWords(level - 1, correntPage - 1)
      .then((data: Array<Word>) => {
        setWords(() => data);
        setIsReady(true);
      });
  }, []);

  if (page === 'start') {
    activeComponent = <SprintStart isReady={isReady} toMain={() => setPage('main')} />;
  } else if (page === 'main') {
    activeComponent = (
      <SprintMain
        words={words}
        toResults={() => setPage('results')}
        trueAnswers={trueAnswers}
        setTrueAnswers={(arr: Array<number>) => setTrueAnswers(arr)}
        falseAnswers={falseAnswers}
        setFalseAnswers={(arr: Array<number>) => setFalseAnswers(arr)}
      />
    );
  } else if (page === 'results') {
    activeComponent = (
      <Results
        toMain={() => setPage('main')}
        trueAnswers={trueAnswers}
        falseAnswers={falseAnswers}
        words={words}
      />
    );
  }

  return (
    <Box overflow="hidden" bg="linear-gradient(rgb(127, 83, 172) 0%,rgb(100, 125, 238) 100%)">
      <Container maxWidth="container.xl">
        {activeComponent}
      </Container>
    </Box>
  );
};

export default SprintGamePage;
