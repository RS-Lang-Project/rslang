import { FC, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Spinner,
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
import { CheckIcon } from '@chakra-ui/icons';
import Footer from '../components/Footer';
import { ReactComponent as HeaderWave } from '../assets/svg/HeaderWave.svg';
import { ReactComponent as FooterWave } from '../assets/svg/FooterWave.svg';
import List from '../components/List';
import { Word, UserWord } from '../requests/requestTypes';
import CardWord from '../components/CardWord';
import {
  getAllWords,
  getAllUserWords,
  getWord,
} from '../requests/serverRequests';
import {
  levelsArr,
  normalStyles,
  activeStyles,
  separatorStyles,
} from '../components/textbookData';

const TextbookPage: FC = () => {
  const [isReady, setIsReady] = useState <boolean>(false);
  const [dataWords, setDataWords] = useState <Word[]>([]);
  const pagesQuantity = 30;
  const hasToken = localStorage.getItem('userToken');
  let token = '';
  let author = false;
  if (hasToken && hasToken !== '') {
    token = hasToken;
    author = true;
  }
  const [isAuthorization] = useState<boolean>(author);
  const [userToken] = useState<string>(token);
  const hasId = localStorage.getItem('userId');
  let idUser = '';
  if (hasId && hasId !== '') {
    idUser = hasId;
  }
  const [userId] = useState<string>(idUser);
  const hasPage = localStorage.getItem('currentPage');
  let page = 1;
  if (hasPage && hasPage !== '') {
    page = +hasPage;
  }
  let level = localStorage.getItem('currentLevel');
  if (!level) {
    level = '1';
  }
  const [isDone, setIsDone] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState(+level);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: page },
  });

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentLevel', currentLevel.toString());
    localStorage.setItem('currentPage', currentPage.toString());
  });

  useEffect(() => {
    setIsReady(false);
    setIsDone(false);
    if (currentLevel !== 7) {
      getAllWords(currentLevel - 1, currentPage - 1)
        .then((data: Array<Word>) => {
          setDataWords(data);
          getAllUserWords(userId, userToken)
            .then(((dataUser: Array<UserWord>) => {
              const dataUserId = dataUser.filter((item) => item.difficulty === 'hard' || item.difficulty === 'easy')
                .map((item) => item.wordId);
              const result = data.filter((item) => dataUserId.includes(item.id));
              if (result.length === 20) {
                setIsDone(true);
              }
            }));
        });
    } else {
      getAllUserWords(userId, userToken)
        .then(((data: Array<UserWord>) => {
          const allPromises = data.filter((item) => item.difficulty === 'hard').map((item) => {
            let word = '';
            if (item.wordId) word = item.wordId;
            return getWord(word);
          });
          Promise.all(allPromises).then((values) => {
            setDataWords(values);
          });
        }));
    }
    setIsReady(true);
  }, [currentPage, currentLevel, userId, userToken]);

  function changeLevel(id: string) {
    setCurrentLevel(+id);
    setCurrentPage(1);
  }

  const outerLimit = 3;
  const innerLimit = 3;

  return (
    <Box>
      <HeaderWave />
      <Box minH="66.3vh">
        {isDone
          ? (
            <Flex m={5} gap={5} justifyContent="center">
              <Box
                p="10px 20px"
                bg="yellow.200"
                color="gray.400"
                borderColor="gray.400"
                borderRadius="10px"
                fontWeight="500"
                border="2px"
                cursor="not-allowed"
              >
                Audio Game
              </Box>
              <Box
                p="10px 20px"
                bg="yellow.200"
                color="gray.400"
                borderColor="gray.400"
                borderRadius="10px"
                fontWeight="500"
                border="2px"
                cursor="not-allowed"
              >
                Sprint Game
              </Box>
            </Flex>
          ) : (
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
          )}
        <Flex
          justifyContent="center"
          flexDirection={{ sm: 'column', md: 'row' }}
          alignItems="center"
          flexWrap="wrap"
          gap={{ sm: '20px', md: '170px' }}
        >
          <Flex alignItems="center" gap={{ base: '10px', md: '20px' }}>
            <Heading fontSize="2xl" color="purple.800">Levels</Heading>
            {levelsArr.map((p) => (
              <Button
                key={p.id}
                background={+currentLevel === +p.id ? p.color : 'gray'}
                borderRadius="50%"
                p="12px 10px"
                color="white"
                _hover={{ background: p.color }}
                onClick={() => changeLevel(p.id)}
              >
                {p.text}
              </Button>
            ))}
          </Flex>
          {isAuthorization
            ? (
              <Button
                fontSize="xl"
                p="12px 10px"
                color="purple.800"
                background="transparent"
                textDecoration={+currentLevel === 7 ? 'underline' : 'none'}
                _hover={{ textDecoration: 'underline' }}
                onClick={() => changeLevel('7')}
              >
                Сложные слова
              </Button>
            ) : (
              < > </>
            )}
        </Flex>
        {dataWords.length === 0 && currentLevel === 7
          ? (
            <Text color="red" textAlign="center" mt={20} fontWeight="500" fontSize="26px">
              Для начала работы - добавьте выбранные слова в раздел &quot;Сложные слова&quot;
            </Text>
          ) : (
            < > </>
          )}
        {isDone && isAuthorization
          ? (
            <Flex alignItems="center" gap="20px" justifyContent="center" mt={6}>
              <CheckIcon color="green.500" w="25px" h="25px" />
              <Text color="green.500" fontWeight="700" fontSize="25px" textAlign="center">Слова пройдены</Text>
            </Flex>
          ) : (
            < > </>
          )}
        {isReady
          ? (
            <List
              items={dataWords}
              renderItems={(word: Word) => (
                <CardWord
                  key={word.id}
                  wordDate={word}
                />
              )}
            />
          ) : (
            <Flex justifyContent="center" mt={10}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="yellow.400"
                size="xl"
              />
            </Flex>
          )}
        {currentLevel !== 7 && isReady
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
      <FooterWave />
      <Footer />
    </Box>
  );
};

export default TextbookPage;
