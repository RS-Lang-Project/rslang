import { FC } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Word } from '../requests/requestTypes';
import { MAIN_LINK } from '../requests/serverRequests';

interface CardWordProps {
  wordDate: Word
}

const CardWord: FC<CardWordProps> = ({ wordDate }) => {
  console.log(wordDate.image);
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '800px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="2xl"
        padding={4}
      >
        <Flex flex={1} bg="purple.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              `${MAIN_LINK}/${wordDate.image}`
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          p={1}
          pt={2}
        >
          <Flex flexDirection="column" borderLeft="4px" borderColor="yellow.300" paddingLeft="20px">
            <Flex alignItems="center">
              <Heading fontSize="2xl" fontFamily="body" marginRight="10px">
                {wordDate.word}
              </Heading>
              <Text alignSelf="center" fontWeight={600} color="gray.500" size="sm">
                {wordDate.transcription}
              </Text>
            </Flex>
            <Text fontWeight={600} color="gray.500" size="sm">
              {wordDate.wordTranslate}
            </Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Box>
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textMeaning }}
              color={useColorModeValue('gray.700', 'gray.400')}
              size="sm"
            />
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textMeaningTranslate }}
              size="sm"
              color="gray.500"
            />
          </Box>
          <Divider orientation="horizontal" />
          <Box>
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textExample }}
              fontWeight={500}
              color={useColorModeValue('gray.700', 'gray.400')}
              size="sm"
            />
            <Text
              dangerouslySetInnerHTML={{ __html: wordDate.textExampleTranslate }}
              color="gray.500"
              size="sm"
            />
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

export default CardWord;
