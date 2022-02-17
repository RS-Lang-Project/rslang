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
import { ReactComponent as HeaderWave } from '../assets/svg/HeaderWave.svg';
import List from '../components/List';
import { Word } from '../requests/requestTypes';
import CardWord from '../components/CardWord';
import { getAllWords, getAllUserAggregatedWords } from '../requests/serverRequests';

const TextbookPage: FC = () => {
  const [dataWords, setDataWords] = useState <Word[]>([]);
  const [dataAgrigatedWords, setDataAgrigatedWords] = useState <Word[]>([]);
  const pagesQuantity = 30;
  const hasPage = localStorage.getItem('currentPage');
  const hasLevel = localStorage.getItem('currentLevel');
  let page = 1;
  if (hasPage && hasPage !== '') {
    page = +hasPage;
  }
  let level = 1;
  if (hasLevel && hasLevel !== '') {
    level = +hasLevel;
  }
  const [currentLevel, setCurrentLevel] = useState(level);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: page },
  });

  const hasToken = localStorage.getItem('userToken');
  let token = '';
  let author = false;
  if (hasToken && hasToken !== '') {
    token = hasToken;
    author = true;
  }
  const [isAuthorization, setAuthorization] = useState<boolean>(author);
  const [userToken, setUserToken] = useState<string>(token);
  const hasId = localStorage.getItem('userId');
  let idUser = '';
  if (hasId && hasId !== '') {
    idUser = hasId;
  }
  const [userId, setUserId] = useState<string>(idUser);
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentPage', currentPage.toString());
    localStorage.setItem('currentLevel', currentLevel.toString());
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

  const openDifficultWords = () => {
    setCurrentLevel(7);
    setDataWords([]);
    getAllUserAggregatedWords(userId, userToken, '1', '1', '20', 'filter')
      .then((data: Array<Word>) => console.log(data));
  };

  useEffect(() => {
    getAllUserAggregatedWords(userId, userToken, currentLevel.toString(), currentPage.toString(), '20')
      .then((data: Array<Word>) => setDataAgrigatedWords(data));
  }, []);

  useEffect(() => {
    if (currentLevel !== 7) {
      getAllWords(currentLevel - 1, currentPage - 1)
        .then((data: Array<Word>) => setDataWords(data));
    }
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
      <HeaderWave />
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
        <Flex justifyContent="center" gap="200px" alignItems="center" flexWrap="wrap">
          <Flex alignItems="center" gap="20px">
            <Heading fontSize="2xl" color="purple.800">Уровни</Heading>
            {levelsArr.map((p) => (
              <Button
                key={p.id}
                background={(+currentLevel === +p.id) ? p.color : 'gray'}
                border={`2px solid ${p.color}`}
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
          {isAuthorization
            ? (
              <Box>
                <Button
                  p="12px 10px"
                  color="purple.800"
                  background="transparent"
                  _hover={{ color: 'purple.700', textDecoration: 'underline' }}
                  onClick={() => openDifficultWords()}
                >
                  Сложные слова
                </Button>
              </Box>
            ) : (
              < > </>
            )}
        </Flex>
        <List
          items={dataWords}
          renderItems={(word: Word) => (
            <CardWord
              key={word.id}
              wordDate={word}
              agrigatedWords={dataAgrigatedWords}
            />
          )}
        />
        {currentLevel !== 7
          ? (
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
          ) : (
            < > </>
          )}
      </Box>
      <Footer />
    </Box>
  );
};

export default TextbookPage;
