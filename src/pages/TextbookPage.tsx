import { FC, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  Previous,
  Paginator,
  PageGroup,
  Next,
  Container,
  usePaginator,
} from 'chakra-paginator';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import Footer from '../components/Footer';
import WaveForHeader from '../components/UI/WaveForHeader';
import List from '../components/List';
import { Word } from '../requests/requestTypes';
import CardWord from '../components/CardWord';
import { getAllWords } from '../requests/serverRequests';

const TextbookPage: FC = () => {
  const [dataWords, setDataWords] = useState <Word[]>();
  const pagesQuantity = 30;
  const [currentLevel, setCurrentLevel] = useState(1);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const levelsArr = [
    {
      id: '1',
      color: 'green.400',
      text: 'A1',
    },
    {
      id: '2',
      color: 'green.500',
      text: 'A2',
    },
    {
      id: '3',
      color: 'yellow.400',
      text: 'B1',
    },
    {
      id: '4',
      color: 'yellow.500',
      text: 'B2',
    },
    {
      id: '5',
      color: 'red.400',
      text: 'C1',
    },
    {
      id: '6',
      color: 'red.500',
      text: 'C2',
    },
  ];

  useEffect(() => {
    getAllWords(currentLevel - 1, currentPage - 1)
      .then((data: Array<Word>) => setDataWords(data));
  }, [currentPage, currentLevel]);

  function changeLevel(id: string) {
    setCurrentLevel(+id);
    setCurrentPage(1);
  }

  const normalStyles = {
    w: 7,
    bg: 'grey.200',
    fontSize: 'sm',
    boxShadow: 'base',
    _hover: {
      bg: 'yellow.300',
    },
  };
  const activeStyles = {
    w: 7,
    bg: 'yellow.300',
    fontSize: 'sm',
    _hover: {
      bg: 'yellow.500',
    },
  };
  const separatorStyles = {
    w: 7,
    bg: 'yellow.300',
  };

  const outerLimit = 3;
  const innerLimit = 3;

  return (
    <Box>
      <WaveForHeader />
      <Box>
        <Flex m={5} gap={5} justifyContent="center">
          <Link to={`/audio-game/${currentLevel}/${currentPage}`}>
            <Box
              p="10px 20px"
              bg="yellow.300"
              color="purple.800"
              borderColor="purple.800"
              borderRadius="10px"
              fontWeight="500"
              border="2px"
            >
              Audio Game
            </Box>
          </Link>
          <Link to={`/sprint-game/${currentLevel}/${currentPage}`}>
            <Box
              p="10px 20px"
              bg="yellow.300"
              color="purple.800"
              borderColor="purple.800"
              borderRadius="10px"
              fontWeight="500"
              border="2px"
            >
              Sprint Game
            </Box>
          </Link>
        </Flex>
        <Flex justifyContent="center" gap="20px" alignItems="center" flexWrap="wrap">
          <Heading fontSize="2xl" color="purple.800">Levels</Heading>
          {levelsArr.map((p) => (
            <Button
              key={p.id}
              background={p.color}
              border="2px solid #fff"
              borderRadius="50%"
              p="12px 10px"
              color="white"
              _hover={{ background: 'purple.800' }}
              onClick={() => changeLevel(p.id)}
            >
              {p.text}
            </Button>
          ))}
        </Flex>
        <List
          items={dataWords}
          renderItems={(word: Word) => (
            <CardWord
              key={word.id}
              wordDate={word}
            />
          )}
        />
        <Paginator
          activeStyles={activeStyles}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          outerLimit={outerLimit}
          innerLimit={innerLimit}
        >
          <Container align="center" justify="center" w="full" p={4} gap="20px">
            <Previous>
              <CgChevronLeft />
            </Previous>
            <PageGroup isInline align="center" />
            <Next>
              <CgChevronRight />
            </Next>
          </Container>
        </Paginator>
      </Box>
      <Footer />
    </Box>
  );
};

export default TextbookPage;
