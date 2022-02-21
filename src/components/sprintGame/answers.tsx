import { FC } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';

interface Props {
  queue: number;
}

const Answers: FC<Props> = (props) => {
  const { queue } = props;
  const items = [];
  for (let i = 0; i < queue; i += 1) {
    const item = (
      <Box
        w="24px"
        h="24px"
        borderRadius="100%"
        background="orange"
        key={items.length + 1}
      />
    );
    items.push(item);
  }
  for (let i = 0; i < 3 - queue; i += 1) {
    const item = (
      <Box
        w="24px"
        h="24px"
        borderRadius="100%"
        background="white"
        key={items.length + 1}
      />
    );
    items.push(item);
  }
  return (
    <Box mt="10px">
      <Flex w="100px" justifyContent="space-around">
        {items.map((item) => item)}
      </Flex>
    </Box>
  );
};

export default Answers;
