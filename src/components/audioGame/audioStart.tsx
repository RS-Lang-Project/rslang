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

const AudioStart: FC<Props> = (props) => {
  const { toMain, isReady } = props;
  let startBtn;

  if (!isReady) {
    startBtn = (
      <Button
        minW="180px"
        isLoading
        colorScheme="green"
      >
        Click me
      </Button>
    );
  } else {
    startBtn = (
      <Button
        minW="180px"
        colorScheme="teal"
        variant="solid"
        onClick={() => toMain()}
      >
        Начать игру
      </Button>
    );
  }

  return (
    <Box color="white" h="91vh" p="100px 0 100px 0">
      <Center h="100%">
        <Flex direction="column" align="center">
          <Heading mb={6} as="h2">
            Аудиовызов
          </Heading>
          {startBtn}
          <Link to="/audio">
            <Button
              minW="180px"
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

export default AudioStart;
