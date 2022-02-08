import { FC } from 'react';
import {
  Box,
  Container,
  Image,
} from '@chakra-ui/react';
import mainImg from '../assets/img/main-img.jpg';

const MainPage: FC = () => (
  <Box>
    <Container>
      <Image src={mainImg} alt="photo" />
    </Container>
    MainPage
  </Box>
);

export default MainPage;
