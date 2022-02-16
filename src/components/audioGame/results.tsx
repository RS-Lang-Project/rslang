import { FC } from 'react';
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
import { MAIN_LINK } from '../../requests/serverRequests';

interface Props {
  toMain: () => void;
  trueAnswers: Array<number>;
  falseAnswers: Array<number>;
  words: Array<Word>;
}

const Results: FC<Props> = (props) => {
  const {
    toMain,
    trueAnswers,
    falseAnswers,
    words,
  } = props;

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
            <Link to="/audio">
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
