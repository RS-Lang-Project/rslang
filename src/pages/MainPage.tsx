import { FC } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Icon,
} from '@chakra-ui/react';
import mainImg from '../assets/img/main-img.jpg';
import statisticIcon from '../assets/img/advantegesIcons/analytics.png';
import textbookIcon from '../assets/img/advantegesIcons/book-stack.png';
import dictionaryIcon from '../assets/img/advantegesIcons/dictionary.png';
import gamesIcon from '../assets/img/advantegesIcons/puzzle.png';
import DmitriyPhoto from '../assets/img/Dmitriy.jpeg';
import KaterynaPhoto from '../assets/img/Kateryna.jpeg';
import Footer from '../components/Footer';
import { ReactComponent as HeaderWave } from '../assets/svg/HeaderWave.svg';
import { ReactComponent as FooterWave } from '../assets/svg/FooterWave.svg';
import AdvantageItem from '../components/AdvantageItem';
import DeveloperCard from '../components/DeveloperCard';

const MainPage: FC = () => (
  <Box>
    <HeaderWave />
    <Container minH="69vh" maxWidth="container.xl">
      <Flex
        align="center"
        flexDirection="row"
        justify="space-between"
        wrap="wrap"
        padding={10}
        pt={0}
      >
        <Box width={{ base: '100%', md: '50%' }}>
          <Heading maxW="300px" mb={6} as="h2" size="lg" color="yellow.400">
            Изучай английский с RS Lang
          </Heading>
          <Text fontWeight={500} maxW="500px" mb={2} fontSize="20px" color="purple.800">
            Давно хотел начать изучение английского,
            но не знал с чего начать?
          </Text>
          <Text fontWeight={500} mb={2} maxW="500px" fontSize="20px" color="purple.800">
            RS Lang - идеально подойдет для учебы
            в игровой форме с любого устройства.
          </Text>
          <Text fontWeight={500} mb={2} maxW="500px" fontSize="20px" color="purple.800">
            Теперь учить английский язык легко и увлекательно!
            Играйте в мини-игры и запоминайте слова.
          </Text>
        </Box>
        <Image width={{ base: '100%', md: '50%' }} src={mainImg} alt="photo" />
      </Flex>
      <Heading textAlign="center" mb={10} as="h2" size="lg" color="purple.800">
        Почему RS Lang?
      </Heading>
      <Flex gap="20px" flexWrap="wrap" justifyContent="center">
        <AdvantageItem
          title="Учебник"
          text="Учебник включает в себя более 3500 слов, с возможностю выбора уровня сложности."
          imgLink={textbookIcon}
        />
        <AdvantageItem
          title="Словарь"
          text="Есть возможность создать свой словарь, добавив слова в избранное."
          imgLink={dictionaryIcon}
        />
        <AdvantageItem
          title="Статистика"
          text="Ослеживание прогреса позволить выучить ещё больше слов вдохновившись результатами."
          imgLink={statisticIcon}
        />
        <AdvantageItem
          title="Игры"
          text="Учи слова в формате игры и удивляйся результатам."
          imgLink={gamesIcon}
        />
      </Flex>
      <Heading textAlign="center" mt={20} mb={10} as="h2" size="lg" color="purple.800">
        Узнай больше о возможностях
      </Heading>
      <Flex justifyContent="center">
        <iframe width="800" height="515" src="https://www.youtube.com/embed/36YnV9STBqc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </Flex>
      <Heading textAlign="center" mt={20} as="h2" size="lg" color="purple.800">
        О нас
      </Heading>
      <Flex
        textAlign="center"
        justifyContent="center"
        direction="column"
        width="full"
      >
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing="20"
          mt={16}
          mx="auto"
        >
          <DeveloperCard
            index={0}
            name="Dmitriy Nikitenko"
            content="Разработал игры Аудиовизов и Спринт. Реализовал раздел статистики. Настроил получение данных из бекенда."
            avatar={DmitriyPhoto}
          />
          <DeveloperCard
            index={1}
            name="Kateryna Vinskovska"
            content="Создала главную страницу и раздел Учебник. Настроила роутинг и авторизацию."
            avatar={KaterynaPhoto}
          />
        </SimpleGrid>
        <Box>
          <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color="yellow.300">
            <path
              fill="currentColor"
              d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898
              4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239
              16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741
              19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848
              34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858
              38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732
              1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267
              0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
            />
          </Icon>
        </Box>
      </Flex>
    </Container>
    <FooterWave />
    <Footer />
  </Box>
);

export default MainPage;
