import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Button,
  List,
  ListItem,
  ListIcon,
  Box,
  Center,
} from '@chakra-ui/react';
import { ReactComponent as headphones } from '../../assets/svg/headphones.svg';
import { Word } from '../../requests/requestTypes';
import {
  MAIN_LINK,
  getUser,
  getUserWords,
  createUserWord,
  updateUserWord,
  getStatistics,
  updateStatistics,
} from '../../requests/serverRequests';

interface Props {
  toMain: () => void;
  trueAnswers: Array<number>;
  falseAnswers: Array<number>;
  words: Array<Word>;
  bestResult: number;
}

const Results: FC<Props> = (props) => {
  const {
    toMain,
    falseAnswers,
    words,
    bestResult,
  } = props;
  let { trueAnswers } = props;
  console.log(bestResult);

  function getZero(n: number): string {
    let res;
    if (n < 10) {
      res = `0${n}`;
    } else {
      res = `${n}`;
    }
    return res;
  }
  const date = new Date();
  const res = `${date.getFullYear()}-${getZero(date.getMonth() + 1)}-${getZero(date.getDate())}`;

  trueAnswers = trueAnswers.filter((num: number) => falseAnswers.indexOf(num) === -1);

  const truAnswersElements: Array<JSX.Element> = Array.from(new Set(trueAnswers)).map((index: number) => (
    <ListItem cursor="pointer" key={index}>
      <ListIcon
        as={headphones}
        onClick={() => new Audio(`${MAIN_LINK}/${words[index].audio}`).play()}
      />
      {words[index].word}
      {' - '}
      {words[index].wordTranslate}
    </ListItem>
  ));

  const falseAnswersElements: Array<JSX.Element> = Array.from(new Set(falseAnswers)).map((index: number) => (
    <ListItem cursor="pointer" key={index}>
      <ListIcon
        as={headphones}
        onClick={() => new Audio(`${MAIN_LINK}/${words[index].audio}`).play()}
      />
      {words[index].word}
      {' - '}
      {words[index].wordTranslate}
    </ListItem>
  ));

  useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('userToken')) {
      const id = `${localStorage.getItem('userId')}`;
      const token = `${localStorage.getItem('userToken')}`;

      getUser(id, token)
        .then(() => {
          let learned = 0;
          let trueAnswersCount = 0;
          let falseAnswersCount = 0;
          let newWordsCount = 0;
          const promises = Array.from(new Set(trueAnswers)).map((index) => {
            const promise = new Promise((resolve) => {
              console.log('trueAnswers first part');
              getUserWords(
                id,
                words[index].id,
                token,
              )
                .then((word) => {
                  const params = {
                    difficulty: word.difficulty,
                    optional: {
                      trueAnswers: word.optional.trueAnswers + 1,
                      falseAnswers: word.optional.falseAnswers,
                      learnedCount: word.optional.learnedCount + 1,
                    },
                  };
                  trueAnswersCount += 1;
                  if (params.optional.learnedCount > 2) {
                    if (params.optional.learnedCount === 3) {
                      learned += 1;
                    }
                    params.difficulty = 'easy';
                  }

                  updateUserWord(
                    params,
                    id,
                    words[index].id,
                    token,
                  )
                    .then(() => resolve(''));
                })
                .catch((e) => {
                  newWordsCount += 1;
                  createUserWord(
                    {
                      difficulty: 'normal',
                      optional: {
                        trueAnswers: 0,
                        falseAnswers: 0,
                        learnedCount: 0,
                      },
                    },
                    id,
                    words[index].id,
                    token,
                  )
                    .then(() => resolve(''));
                });
            });
            return promise;
          });
          Promise.all(promises)
            .then(() => {
              console.log(trueAnswersCount, falseAnswersCount, newWordsCount, learned, bestResult);
              const secondPromises = Array.from(new Set(falseAnswers)).map((index) => {
                const secondPromise = new Promise((resolve) => {
                  console.log('falseAnswers first part');
                  getUserWords(
                    id,
                    words[index].id,
                    token,
                  )
                    .then((word) => {
                      const params = {
                        difficulty: 'hard',
                        optional: {
                          trueAnswers: word.optional.trueAnswers,
                          falseAnswers: word.optional.falseAnswers + 1,
                          learnedCount: 0,
                        },
                      };
                      falseAnswersCount += 1;
                      updateUserWord(
                        params,
                        id,
                        words[index].id,
                        token,
                      )
                        .then(() => resolve(''));
                    })
                    .catch((e) => {
                      newWordsCount += 1;
                      createUserWord(
                        {
                          difficulty: 'normal',
                          optional: {
                            trueAnswers: 0,
                            falseAnswers: 0,
                            learnedCount: 0,
                          },
                        },
                        id,
                        words[index].id,
                        token,
                      )
                        .then(() => resolve(''));
                    });
                });
                return secondPromise;
              });
              Promise.all(secondPromises)
                .then(() => {
                  console.log(trueAnswersCount, falseAnswersCount, newWordsCount, learned, bestResult);
                  getStatistics(
                    id,
                    token,
                  )
                    .then((data) => {
                      const map = new Map(Object.entries(data.optional));
                      if (map.has(res)) {
                        map.set(res, {
                          sprint: {
                            newWords: data.optional[res].sprint.newWords + newWordsCount,
                            trueAnswers: data.optional[res].sprint.trueAnswers + trueAnswersCount,
                            falseAnswers: data.optional[res].sprint.falseAnswers + falseAnswersCount,
                            bestResult:
                              data.optional[res].sprint.bestResult < bestResult
                                ? bestResult
                                : data.optional[res].sprint.bestResult,
                          },
                          audio: {
                            newWords: data.optional[res].audio.newWords,
                            trueAnswers: data.optional[res].audio.trueAnswers,
                            falseAnswers: data.optional[res].audio.falseAnswers,
                            bestResult: data.optional[res].audio.bestResult,
                          },
                          total: {
                            newWords: data.optional[res].total.newWords + newWordsCount,
                            trueAnswers: data.optional[res].total.trueAnswers + trueAnswersCount,
                            falseAnswers: data.optional[res].total.falseAnswers + falseAnswersCount,
                            bestResult:
                              data.optional[res].total.bestResult < bestResult
                                ? bestResult
                                : data.optional[res].total.bestResult,
                            learnedWords: data.optional[res].total.learnedWords + learned,
                          },
                        });
                        updateStatistics(
                          {
                            learnedWords: data.optional[res].total.learnedWords + learned,
                            optional: Object.fromEntries(map.entries()),
                          },
                          id,
                          token,
                        )
                          .then(() => console.log('Статистика была обновлена за: ', res));
                      } else {
                        map.set(res, {
                          sprint: {
                            newWords: newWordsCount,
                            trueAnswers: trueAnswersCount,
                            falseAnswers: falseAnswersCount,
                            bestResult,
                          },
                          audio: {
                            newWords: 0,
                            trueAnswers: 0,
                            falseAnswers: 0,
                            bestResult: 0,
                          },
                          total: {
                            newWords: newWordsCount,
                            trueAnswers: trueAnswersCount,
                            falseAnswers: falseAnswersCount,
                            bestResult,
                            learnedWords: learned,
                          },
                        });
                        updateStatistics(
                          {
                            learnedWords: learned,
                            optional: Object.fromEntries(map.entries()),
                          },
                          id,
                          token,
                        )
                          .then(() => console.log('Статистика была создана за новый день: ', res));
                      }
                    })
                    .catch((e) => {
                      const map = new Map();
                      map.set(res, {
                        sprint: {
                          newWords: newWordsCount,
                          trueAnswers: trueAnswersCount,
                          falseAnswers: falseAnswersCount,
                          bestResult,
                        },
                        audio: {
                          newWords: 0,
                          trueAnswers: 0,
                          falseAnswers: 0,
                          bestResult: 0,
                        },
                        total: {
                          newWords: newWordsCount,
                          trueAnswers: trueAnswersCount,
                          falseAnswers: falseAnswersCount,
                          bestResult,
                          learnedWords: 0,
                        },
                      });
                      updateStatistics(
                        {
                          learnedWords: 0,
                          optional: Object.fromEntries(map.entries()),
                        },
                        id,
                        token,
                      )
                        .then(() => console.log('new statistic created for: ', res));
                    });
                });
            });
        });
    }
  }, []);

  return (
    <Box color="black" h="100vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex maxH="80%" overflowY="scroll" background="white" p="20px" borderRadius="10px" direction="column">
          <Heading textAlign="center" m="10px" fontSize="22px" as="h2">
            Результаты
          </Heading>
          <Flex justifyContent="space-between">
            <Button
              m="5px"
              colorScheme="teal"
              size="md"
              onClick={() => toMain()}
            >
              Играть снова
            </Button>
            <Link to="/sprint">
              <Button m="5px" colorScheme="purple" size="md">
                Изменить уровень
              </Button>
            </Link>
          </Flex>
          <Heading m="15px 0 10px 0" fontSize="18px" as="h3">
            Выученные слова:
            {` ${truAnswersElements.length}`}
          </Heading>
          <List spacing={3}>
            {truAnswersElements.map((element) => element)}
          </List>
          <Heading m="15px 0 10px 0" fontSize="19px" as="h3">
            Ошибки:
            {` ${falseAnswersElements.length}`}
          </Heading>
          <List spacing={3}>
            {falseAnswersElements.map((element) => element)}
          </List>
        </Flex>
      </Center>
    </Box>
  );
};

export default Results;
