import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';

interface Props {
  toMain: () => void;
  isReady: boolean;
}

const SprintStart: FC<Props> = (props) => {
  const { toMain, isReady } = props;
  let startBtn;

  if (!isReady) {
    startBtn = (
      <Button
        isLoading
        colorScheme="green"
      >
        Click me
      </Button>
    );
  } else {
    startBtn = (
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => toMain()}
      >
        Начать игру
      </Button>
    );
  }

  return (
    <Box color="white" h="90vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Heading as="h2">
            Спринт
          </Heading>
          <Text m="15px" fontSize="20px">
            Возможно тут будет какой-то текст...
          </Text>
          {startBtn}
          <Link to="/sprint">
            <Button
              mt="15px"
              colorScheme="purple"
              variant="solid"
            >
              Изменить уровень
            </Button>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
};

export default SprintStart;
