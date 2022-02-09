import { FC } from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';

const SprintStart: FC = () => (
  <Box color="white" h="90vh" p="100px 0 100px 0">
    <Center h="100%">
      <Flex direction="column" align="center">
        <Heading as="h2">
          Спринт
        </Heading>
        <Text m="15px" fontSize="20px">
          Возможно тут будет какой-то текст...
        </Text>
        <Button colorScheme="teal" variant="solid">Начать игру</Button>
        <Button mt="15px" colorScheme="purple" variant="solid">Изменить уровень</Button>
      </Flex>
    </Center>
  </Box>
);

export default SprintStart;
