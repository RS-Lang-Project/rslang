import { FC } from 'react';
import {
  Container,
  Center,
  Box,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import Levels from '../components/audioGame/levels';

const AudioPromoPage: FC = () => (
  <Box overflow="hidden" bg="linear-gradient(rgb(127, 83, 172) 0%,rgb(100, 125, 238) 100%)">
    <Container maxWidth="container.xl">
      <Box color="white" h="91vh" p="100px 0 100px 0">
        <Center h="100%">
          <Flex m="0 auto 0 auto" direction="column" w="576px" align="center">
            <Heading m="0 0 20px 0" fontSize="42px" as="h2" size="lg">
              Аудиовызов
            </Heading>
            <Text fontSize="24px" lineHeight="24px" align="center">
              Аудиотренировка - тренировка понимания слов на слух.
            </Text>
            <Text fontSize="24px" mt="10px" lineHeight="24px" align="center">
              Наберите максимальное количество правильных ответов прослушивая слова.
            </Text>
            <Text m="15px 0 0 0" fontSize="24px" fontWeight="bold" lineHeight="24px" align="center">
              Выберите уровень сложности слов:
            </Text>
            <Levels />
          </Flex>
        </Center>
      </Box>
    </Container>
  </Box>
);

export default AudioPromoPage;
