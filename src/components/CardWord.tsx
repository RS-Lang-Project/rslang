import { FC, useState, useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Divider,
  Text,
} from '@chakra-ui/react';
import { StarIcon, CheckIcon } from '@chakra-ui/icons';
import { Word, UserWord } from '../requests/requestTypes';
import {
  MAIN_LINK,
  getUserWords,
  createUserWord,
  getUserAggregatedWords,
} from '../requests/serverRequests';
import headphones from '../assets/svg/headphones.svg';

interface CardWordProps {
  wordDate: Word,
  agrigatedWords: Word[]
}

const CardWord: FC<CardWordProps> = ({ wordDate, agrigatedWords }) => {
  const [isAgrigate, setIsAgrigate] = useState<boolean>(agrigatedWords.map((item) => item.id).includes(wordDate.id));
  const hasToken = localStorage.getItem('userToken');
  let token = '';
  let author = false;
  if (hasToken && hasToken !== '') {
    token = hasToken;
    author = true;
  }
  const [hasWord, setHasWord] = useState<boolean>(false);
  const [isAuthorization, setAuthorization] = useState<boolean>(author);
  const [userToken, setUserToken] = useState<string>(token);
  const hasId = localStorage.getItem('userId');
  let idUser = '';
  if (hasId && hasId !== '') {
    idUser = hasId;
  }
  const [userId, setUserId] = useState<string>(idUser);

  let isPlay = false;
  const [isDifficult, setIsDifficult] = useState(false);
  const [isLearned, setIsLearned] = useState(false);

  useEffect(() => {
    if (isAgrigate) {
      // getUserAggregatedWords(userId, wordDate.id, userToken)
      //   .then((data: Word) => console.log(data));
      // console.log('work')
    }
  }, [isAgrigate]);

  const addToDifficult = () => {
    if (isDifficult) {
      setIsDifficult(false);
    } else {
      if (!isAgrigate) {
        createUserWord({
          difficulty: 'hard',
          optional: {
            trueAnswers: 0,
            falseAnswers: 0,
            learnedCount: 0,
          },
        }, userId, wordDate.id, userToken)
          .then((data: UserWord) => console.log(data));
      }
      setIsAgrigate(true);
      setIsDifficult(true);
      setIsLearned(false);
    }
  };

  const addToLearned = () => {
    if (isLearned) {
      setIsLearned(false);
    } else {
      setIsAgrigate(true);
      setIsLearned(true);
      setIsDifficult(false);
    }
  };

  const playAudio = () => {
    const audio = new Audio(`${MAIN_LINK}/${wordDate.audio}`);
    const audioMeaning = new Audio(`${MAIN_LINK}/${wordDate.audioMeaning}`);
    const audioExample = new Audio(`${MAIN_LINK}/${wordDate.audioExample}`);
    if (!isPlay) {
      isPlay = true;
      audio.play();
      audio.addEventListener('ended', () => audioMeaning.play());
      audioMeaning.addEventListener('ended', () => audioExample.play());
      audioExample.addEventListener('ended', () => {
        isPlay = false;
      });
    } else {
      audio.pause();
      audioMeaning.pause();
      audioExample.pause();
    }
  };
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '800px' }}
        height="auto"
        minH="{{ sm: '476px', md: '20rem' }}"
        direction={{ base: 'column', md: 'row' }}
        bg="gray.50"
        boxShadow="2xl"
        padding={4}
        position="relative"
      >
        <Flex flex={1} bg="purple.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={`${MAIN_LINK}/${wordDate.image}`}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          p={1}
          pt={2}
        >
          <Flex w="100%" justifyContent="end" gap="4">
            <Box fontSize="20px" color="#000">
              <Box
                className="audio__play"
                cursor="pointer"
                borderRadius="100%"
                w="40px"
                h="40px"
                background="yellow.300"
                onClick={() => playAudio()}
              >
                <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                  <Tooltip title="Прослушать">
                    <Image w="25px" h="25px" src={`${headphones}`} />
                  </Tooltip>
                </Flex>
              </Box>
            </Box>
            {isAuthorization
              ? (
                < >
                  <Box fontSize="20px" color="#000">
                    <Box
                      className="audio__play"
                      cursor="pointer"
                      borderRadius="100%"
                      w="40px"
                      h="40px"
                      background={isDifficult ? 'red.500' : 'grey'}
                      onClick={() => addToDifficult()}
                    >
                      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                        <Tooltip
                          title={isDifficult ? 'Убрать из "Сложные слова"' : 'Добавить в "Сложные слова"'}
                        >
                          <StarIcon color="white" w="25px" h="25px" />
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Box>
                  <Box fontSize="20px" color="#000">
                    <Box
                      className="audio__play"
                      cursor="pointer"
                      borderRadius="100%"
                      w="40px"
                      h="40px"
                      background={isLearned ? 'green.500' : 'grey'}
                      onClick={() => addToLearned()}
                    >
                      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                        <Tooltip
                          title={isLearned ? 'Убрать из "Изученное"' : 'Добавить в "Изученное"'}
                        >
                          <CheckIcon color="white" w="25px" h="25px" />
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Box>
                </>
              ) : (
                < > </>
              )}
          </Flex>
          <Flex flexDirection="column" borderLeft="4px" borderColor="yellow.300" paddingLeft="20px">
            <Flex alignItems="center">
              <Heading fontSize="2xl" fontFamily="body" marginRight="10px">
                {wordDate.word}
              </Heading>
              <Text alignSelf="center" fontWeight={600} color="gray.500" size="sm">
                {wordDate.transcription}
              </Text>
            </Flex>
            <Text fontWeight={600} color="gray.500" size="sm">
              {wordDate.wordTranslate}
            </Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Box>
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textMeaning }}
              color="gray.600"
              size="sm"
            />
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textMeaningTranslate }}
              size="sm"
              color="gray.500"
            />
          </Box>
          <Divider orientation="horizontal" />
          <Box>
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textExample }}
              color="gray.600"
              size="sm"
            />
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textExampleTranslate }}
              color="gray.500"
              size="sm"
            />
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

export default CardWord;
