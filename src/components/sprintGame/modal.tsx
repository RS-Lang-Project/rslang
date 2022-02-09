import { FC } from 'react';
import {
  Text,
} from '@chakra-ui/react';

const Modal: FC = () => {
  const stat = 9999;
  return (
    <Text color="orange" fontSize="38px" mt="10px" fontWeight="bold" align="center">
      Modal window
      {stat}
    </Text>
  );
};

export default Modal;
