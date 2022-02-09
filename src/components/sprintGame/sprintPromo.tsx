import { FC } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Center,
} from '@chakra-ui/react';
import Levels from './levels';

const SprintPromo: FC = () => (
  <Box color="white" h="90vh" p="100px 0 100px 0">
    <Center h="100%">
      <Flex m="0 auto 0 auto" direction="column" w="576px" align="center">
        <Heading m="0 0 20px 0" fontSize="42px" as="h2" size="lg">
          Спринт
        </Heading>
        <Text fontSize="24px" lineHeight="24px" align="center">
          Спринт - тренировка на скорость.
        </Text>
        <Text fontSize="24px" lineHeight="24px" align="center">
          Наберите максимальное количество првильных ответов за 30 секнд.
        </Text>
        <Text m="15px 0 0 0" fontSize="24px" fontWeight="bold" lineHeight="24px" align="center">
          Выберите уровень сложности слов:
        </Text>
        <Levels />
      </Flex>
    </Center>
  </Box>
);

export default SprintPromo;
