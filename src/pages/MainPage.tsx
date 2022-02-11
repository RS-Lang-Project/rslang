import { FC } from 'react';
import {
  Box,
  Container,
  Image,
} from '@chakra-ui/react';
import mainImg from '../assets/img/main-img.jpg';
import Footer from '../components/Footer';
import { ReactComponent as HeaderWave } from '../assets/svg/HeaderWave.svg';

const MainPage: FC = () => (
  <Box>
    <HeaderWave />
    <Container>
      <Image src={mainImg} alt="photo" />
    </Container>
    MainPage
    <Footer />
  </Box>
);

export default MainPage;
