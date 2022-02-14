import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  Heading,
  Flex,
  Container,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import 'focus-visible/dist/focus-visible';
import '../styles/App.css';
import BtnSignIn from './BtnSignIn';

const Header: FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = (): void => (isOpen ? onClose() : onOpen());

  return (
    <Box bg="purple.800">
      <Container maxWidth="container.xl">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={4}
          color="white"
        >
          <Heading as="h1" size="lg" color="yellow.300">
            RS Lang
          </Heading>
          <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
            <HamburgerIcon />
          </Box>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            flexGrow={1}
            justifyContent={{ base: 'end', md: 'end' }}
            mt={{ base: 4, md: 0 }}
            alignItems="center"
          >
            <Link className="header-link" to="/">Главная</Link>
            <Link className="header-link" to="/textbook">Учебник</Link>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="purple.800"
                border="none"
                _hover={{
                  bg: 'purple.800',
                  border: 'none',
                  outline: 'none',
                  color: 'yellow.300',
                }}
                _active={{
                  bg: 'purple.800',
                  border: 'none',
                  outline: 'none',
                  color: 'yellow.300',
                }}
              >
                Игры
              </MenuButton>
              <MenuList bg="white" color="purple.800" border="2px" borderColor="yellow.300">
                <MenuItem _hover={{ bgColor: 'yellow.300' }}>
                  <Link to="/audio">Аудиовызов</Link>
                </MenuItem>
                <MenuItem _hover={{ bgColor: 'yellow.300' }}>
                  <Link to="/sprint">Спринт</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Link className="header-link" to="/statistics">Статистика</Link>
          </Stack>
          <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            mt={{ base: 4, md: 0 }}
          >
            <BtnSignIn />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
