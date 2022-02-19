import { FC, useRef, useEffect } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import {
  getStatistics,
  getUser,
} from '../requests/serverRequests';
import { ReactComponent as star } from '../assets/svg/star.svg';

const StatisticsPage: FC = () => {
  const sprintNewWords = 9999;
  const audioNewWords = 9999;
  const totalNewWords = 9999;
  const dateInput = useRef<HTMLInputElement>(null);
  const onInputDateChange = () => {
    console.log(dateInput.current?.value);
  };

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
            .then((data) => console.log(data));
        })
        .catch((e) => console.log('Пользователь не найден'));
    }
  }, []);

  return (
    <div>
      <Box>
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
              defaultValue="2022-02-18"
              onChange={onInputDateChange}
            />
          </Text>
          <Flex justifyContent="space-around">
            <Box p="15px">
              <Heading as="h3">
                Статистика по мини-играм
              </Heading>
              <Box>
                <Heading mt="20px" fontSize="22px" textAlign="center" as="h4">
                  Спринт:
                </Heading>
                <List fontSize="20px" mt="20px" spacing={3}>
                  <ListItem verticalAlign="center">
                    <ListIcon w="30px" h="30px" as={star} />
                    Количество новых слов за день:
                    {` ${sprintNewWords} `}
                  </ListItem>
                  <ListItem>
                    <ListIcon w="30px" h="30px" as={star} />
                    Процент правильных ответов:
                    {` ${audioNewWords}`}
                    %
                  </ListItem>
                  <ListItem>
                    <ListIcon w="30px" h="30px" as={star} />
                    Самая длинная серия правильных ответов:
                    {` ${totalNewWords} `}
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Heading mt="20px" fontSize="22px" textAlign="center" as="h4">
                  Аудиовызов:
                </Heading>
                <List fontSize="20px" mt="20px" spacing={3}>
                  <ListItem verticalAlign="center">
                    <ListIcon w="30px" h="30px" as={star} />
                    Количество новых слов за день:
                    {` ${sprintNewWords} `}
                  </ListItem>
                  <ListItem>
                    <ListIcon w="30px" h="30px" as={star} />
                    Процент правильных ответов:
                    {` ${audioNewWords}`}
                    %
                  </ListItem>
                  <ListItem>
                    <ListIcon w="30px" h="30px" as={star} />
                    Самая длинная серия правильных ответов:
                    {` ${totalNewWords} `}
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box p="15px">
              <Heading as="h3">
                Общая статистика за день
              </Heading>
              <List fontSize="20px" mt="20px" spacing={3}>
                <ListItem verticalAlign="center">
                  <ListIcon w="30px" h="30px" as={star} />
                  Количество новых слов за день:
                  {` ${sprintNewWords} `}
                </ListItem>
                <ListItem>
                  <ListIcon w="30px" h="30px" as={star} />
                  Количество изученных слов за день:
                  {` ${audioNewWords} `}
                </ListItem>
                <ListItem>
                  <ListIcon w="30px" h="30px" as={star} />
                  Процент правильных ответов за день:
                  {` ${totalNewWords}`}
                  %
                </ListItem>
              </List>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </div>
  );
};

export default StatisticsPage;
