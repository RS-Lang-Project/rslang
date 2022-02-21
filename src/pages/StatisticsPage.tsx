import {
  FC,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Grid,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import { ReactComponent as HeaderWave } from '../assets/svg/HeaderWave.svg';
import { ReactComponent as FooterWave } from '../assets/svg/FooterWave.svg';
import {
  getStatistics,
  getUser,
} from '../requests/serverRequests';
import { IDate } from '../requests/requestTypes';

const StatisticsPage: FC = () => {
  const date = new Date();
  const dateInput = useRef<HTMLInputElement>(null);
  const onInputDateChange = () => {
    if (typeof dateInput.current?.value === 'string') {
      setCurentDate(dateInput.current?.value);
    }
  };
  const [curentDate, setCurentDate] = useState(
    `${date.getFullYear()}-${getZero(date.getMonth() + 1)}-${getZero(date.getDate())}`,
  );
  const [sprintPercent, setSprintPercent] = useState(0);
  const [audioPercent, setAudioPercent] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [userMessage, setUserMessage] = useState<null | string>(null);
  const [curentDateStatistics, setCurentDateStatistics] = useState<IDate>(
    {
      sprint: {
        newWords: 0,
        trueAnswers: 0,
        falseAnswers: 0,
        bestResult: 0,
      },
      audio: {
        newWords: 0,
        trueAnswers: 0,
        falseAnswers: 0,
        bestResult: 0,
      },
      total: {
        newWords: 0,
        trueAnswers: 0,
        falseAnswers: 0,
        bestResult: 0,
        learnedWords: 0,
      },
    },
  );

  function getZero(n: number): string {
    let res;
    if (n < 10) {
      res = `0${n}`;
    } else {
      res = `${n}`;
    }
    return res;
  }

  useEffect(() => {
    const sprintTotal = curentDateStatistics.sprint.trueAnswers + curentDateStatistics.sprint.falseAnswers;
    if (sprintTotal > 0) {
      setSprintPercent(Math.floor((100 / sprintTotal) * curentDateStatistics.sprint.trueAnswers));
    } else {
      setSprintPercent(0);
    }

    const audioTotal = curentDateStatistics.audio.trueAnswers + curentDateStatistics.audio.falseAnswers;
    if (audioTotal > 0) {
      setAudioPercent(Math.floor((100 / audioTotal) * curentDateStatistics.audio.trueAnswers));
    } else {
      setAudioPercent(0);
    }

    const total = curentDateStatistics.sprint.trueAnswers + curentDateStatistics.sprint.falseAnswers
                  + curentDateStatistics.audio.trueAnswers + curentDateStatistics.audio.falseAnswers;
    if (total > 0) {
      setTotalPercent(Math.floor(
        (100 / total) * (curentDateStatistics.sprint.trueAnswers + curentDateStatistics.audio.trueAnswers),
      ));
    } else {
      setTotalPercent(0);
    }
  }, [curentDateStatistics]);

  useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('userToken')) {
      const id = `${localStorage.getItem('userId')}`;
      const token = `${localStorage.getItem('userToken')}`;

      getUser(id, token)
        .then(() => {
          getStatistics(
            id,
            token,
          )
            .then((data) => {
              setUserMessage(null);
              const map = new Map(Object.entries(data.optional));
              if (map.has(curentDate)) {
                const obj = map.get(curentDate);
                if (obj) {
                  setCurentDateStatistics(obj);
                }
              } else {
                setUserMessage('У вас не было занятий за эту дату или с того момента прошло больше чем 21 день');
              }
            })
            .catch((e) => {
              setUserMessage(`Извините, но для вашего аккаунта не найдена статистика,
                         попробуйте начать изучение слов с помощью одной из наших мини-игр или перезайдите в аккаунт`);
            });
        })
        .catch((e) => {
          setUserMessage(`Извините, но для вашего аккаунта не найдена статистика,
                         попробуйте начать изучение слов с помощью одной из наших мини-игр или перезайдите в аккаунт`);
        });
    } else {
      setUserMessage('Сначала вам нужно войти в свой аккаунт!');
    }
  }, [curentDate]);

  let content;

  if (userMessage) {
    content = (
      <Text color="red.500" fontSize="26px" fontWeight="bold" m="20px" textAlign="center">{userMessage}</Text>
    );
  } else {
    content = (
      <Flex flexDirection="column" justifyContent="space-around">
        <Box p="15px">
          <Heading as="h3" m="50px" textAlign="center" borderBottom="1px solid black">
            Статистика по мини-играм
          </Heading>
          <Box>
            <Heading
              m="50px 0 20px 0"
              fontSize="28px"
              textAlign="center"
              as="h4"
            >
              Спринт:
            </Heading>
            <Grid
              fontSize="20px"
              mt="20px"
              gridTemplateColumns="1fr 1fr 1fr"
              gridTemplateRows="auto"
              gap="10px"
            >
              <Box justifySelf="center">
                Количество новых слов за день:
                <Box mt="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.sprint.newWords} `}
                </Box>
              </Box>
              <Box justifySelf="center">
                Процент правильных ответов:
                <Box textAlign="center">
                  <CircularProgress m="5px" color="orange" value={sprintPercent} size="120px">
                    <CircularProgressLabel color="orange" fontSize="38px">
                      {` ${sprintPercent}`}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Box>
              <Box justifySelf="center">
                Самая длинная серия правильных ответов:
                <Box mt="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.sprint.bestResult} `}
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box>
            <Heading m="50px 0 20px 0" fontSize="28px" textAlign="center" as="h4">
              Аудиовызов:
            </Heading>
            <Grid
              fontSize="20px"
              mt="20px"
              gridTemplateColumns="1fr 1fr 1fr"
              gridTemplateRows="auto"
              gap="10px"
            >
              <Box justifySelf="center">
                Количество новых слов за день:
                <Box m="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.audio.newWords} `}
                </Box>
              </Box>
              <Box justifySelf="center">
                Процент правильных ответов:
                <Box textAlign="center">
                  <CircularProgress m="5px" color="orange" value={audioPercent} size="120px">
                    <CircularProgressLabel color="orange" fontSize="38px">
                      {` ${audioPercent}`}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Box>
              <Box justifySelf="center">
                Самая длинная серия правильных ответов:
                <Box m="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.audio.bestResult} `}
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box p="15px">
            <Heading as="h3" m="50px" textAlign="center" borderBottom="1px solid black">
              Общая статистика за день
            </Heading>
            <Grid
              fontSize="20px"
              mt="20px"
              gridTemplateColumns="1fr 1fr 1fr"
              gridTemplateRows="auto"
              gap="10px"
            >
              <Box justifySelf="center">
                Количество новых слов за день:
                <Box m="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.total.newWords} `}
                </Box>
              </Box>
              <Box justifySelf="center">
                Количество изученных слов за день:
                <Box m="15px" textAlign="center" fontSize="38px" color="green.500" fontWeight="bold">
                  {` ${curentDateStatistics.total.learnedWords} `}
                </Box>
              </Box>
              <Box justifySelf="center">
                Процент правильных ответов за день:
                <Box textAlign="center">
                  <CircularProgress m="5px" color="orange" value={totalPercent} size="120px">
                    <CircularProgressLabel color="orange" fontSize="38px">
                      {` ${totalPercent}`}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Flex>
    );
  }

  return (
    <div>
      <HeaderWave />
      <Box minH="68vh">
        <Flex direction="column">
          <Heading as="h2" textAlign="center" m="10px">
            Статистика пользователя
          </Heading>
          <Text fontSize="24px" textAlign="center" fontWeight="bold" m="10px">
            Выберите день отображения статистики
          </Text>
          <Text fontSize="24px" textAlign="center" fontWeight="bold" m="10px">
            <input
              ref={dateInput}
              type="date"
              defaultValue={curentDate}
              onChange={onInputDateChange}
            />
          </Text>
          {content}
        </Flex>
      </Box>
      <FooterWave />
      <Footer />
    </div>
  );
};

export default StatisticsPage;
