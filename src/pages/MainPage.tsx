import { FC } from 'react';
import {
  Box,
  Container,
  Image,
} from '@chakra-ui/react';
import mainImg from '../assets/img/main-img.jpg';
import Footer from '../components/Footer';
import WaveForHeader from '../components/UI/WaveForHeader';

const MainPage: FC = () => (
  <Box>
    <WaveForHeader />
    <Container>
      <Image src={mainImg} alt="photo" />
    </Container>
    MainPage
    <Footer />
  </Box>
);

export default MainPage;
