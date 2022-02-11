import { FC } from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';
import Answers from './answers';
import Timer from './timer';

const SprintMain: FC = () => {
  const score = 99;
  const plusScore = 10;
  const word = 'Русское слово';
  const translate = 'translate';

  return (
    <Box color="white" h="90vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Text fontWeight="bold" fontSize="32px">
            You score:
            {` ${score}`}
          </Text>
          <Text mt="5px" fontWeight="bold" fontSize="28px">
            +
            {` ${plusScore}`}
          </Text>
          <Answers />
          <Flex
            direction="column"
            background="white"
            border="1px solid #000"
            borderRadius="10px"
            p="10px"
            m="20px 10px 10px 10px"
            minW="420px"
          >
            <Text fontSize="20px" color="#000" align="center">
              {`${word} `}
              -
              {` ${translate}`}
            </Text>
            <Flex m="15px auto 15px auto" w="300px" justifyContent="space-around">
              <Button colorScheme="green" variant="solid">Правильно</Button>
              <Button colorScheme="red" variant="solid">Неправильно</Button>
            </Flex>
          </Flex>
          <Timer />
        </Flex>
      </Center>
    </Box>
  );
};

export default SprintMain;
