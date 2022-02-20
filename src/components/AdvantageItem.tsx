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
} from '@chakra-ui/react';

interface AdvantageItemProps {
  title: string,
  text: string,
  imgLink: string,
}

const AdvantageItem: FC<AdvantageItemProps> = ({ title, text, imgLink }) => (
  <Box
    maxW="250px"
    w="full"
    bg="gray.50"
    boxShadow="2xl"
    rounded="lg"
    p={6}
    textAlign="center"
  >
    <Image m="auto" maxW="50%" src={imgLink} alt={title} />
    <Heading maxW="300px" mt={4} mb={4} as="h3" size="md" color="yellow.400">
      {title}
    </Heading>
    <Text fontWeight={500} maxW="400px" color="purple.800">
      {text}
    </Text>
  </Box>
);

export default AdvantageItem;
