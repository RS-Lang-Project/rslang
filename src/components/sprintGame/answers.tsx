import { FC } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';

const Answers: FC = () => {
  const color = 'white';
  return (
    <Box mt="10px">
      <Flex w="100px" justifyContent="space-around">
        <Box
          w="24px"
          h="24px"
          borderRadius="100%"
          background={color}
        />
        <Box
          w="24px"
          h="24px"
          borderRadius="100%"
          background={color}
        />
        <Box
          w="24px"
          h="24px"
          borderRadius="100%"
          background={color}
        />
      </Flex>
    </Box>
  );
};

export default Answers;
