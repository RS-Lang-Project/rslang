import { FC } from 'react';
import {
  Box,
  Container,
} from '@chakra-ui/react';
// import WaveForHeader from '../components/UI/WaveForHeader';
import SprintMain from '../components/sprintGame/sprintMain';
// import SprintStart from '../components/sprintGame/sprintStart';

const SprintGamePage: FC = () => (
  <Box overflow="hidden" bg="linear-gradient(rgb(127, 83, 172) 0%,rgb(100, 125, 238) 100%)">
    {/* <Box transform="rotate(180deg)">
      <WaveForHeader />
    </Box> */}
    <Container maxWidth="container.xl">
      {/* <SprintStart /> */}
      <SprintMain />
    </Container>
  </Box>
);

export default SprintGamePage;
