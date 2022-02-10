import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import '../../styles/sprintGame/levels.css';

const Levels: FC = () => (
  <Box m="20px" w="420px">
    <Flex justifyContent="space-around">
      <Link to="/sprint-game/1/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="green.400"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          A1
        </Box>
      </Link>
      <Link to="/sprint-game/2/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="green.500"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          A2
        </Box>
      </Link>
      <Link to="/sprint-game/3/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="blue.400"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          B1
        </Box>
      </Link>
      <Link to="/sprint-game/4/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="blue.500"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          B2
        </Box>
      </Link>
      <Link to="/sprint-game/5/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="red.400"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          C1
        </Box>
      </Link>
      <Link to="/sprint-game/6/1">
        <Box
          className="sprint__round"
          cursor="pointer"
          background="red.500"
          border="2px solid #fff"
          borderRadius="100%"
          p="9px 12px"
        >
          C2
        </Box>
      </Link>
    </Flex>
  </Box>
);

export default Levels;
