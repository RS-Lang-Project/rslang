import { useState, useEffect } from 'react';
import {
  Box,
  ModalOverlay,
  Modal,
  Button,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  Heading,
  ModalContent,
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUser, signIn as signInRequest } from '../requests/serverRequests';
import { NewUserResponse, SignInResult } from '../requests/requestTypes';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const BtnSignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sign, setSign] = useState<string>('in');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const hasToken = localStorage.getItem('userToken');
  let token = '';
  let author = false;
  if (hasToken && hasToken !== '') {
    token = hasToken;
    author = true;
  }
  const [isAuthorization, setAuthorization] = useState<boolean>(author);
  const [userToken, setUserToken] = useState<string>(token);
  useEffect(() => {
    localStorage.setItem('userToken', userToken);
  }, [userToken]);

  const handleChangeName = (event: InputEvent): void => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event: InputEvent): void => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: InputEvent): void => {
    setPassword(event.target.value);
  };

  const resetData = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const changeModal = () => {
    resetData();
    if (sign === 'in') {
      setSign('up');
    } else {
      setSign('in');
    }
  };

  const openModal = () => {
    setSign('in');
    resetData();
    onOpen();
  };

  const signUp = () => {
    createUser({ name, email, password })
      .then((data: NewUserResponse) => {
        signIn();
        onClose();
      })
      .catch((e) => {
        setErrorMessage('Incorrect e-mail or password');
      });
  };

  const signIn = () => {
    signInRequest({ email, password })
      .then((data: SignInResult) => {
        setUserToken(data.token);
        localStorage.setItem('userId', data.userId);
        onClose();
        setAuthorization(true);
        window.location.reload();
      })
      .catch((e) => {
        setErrorMessage('Incorrect e-mail or password');
      });
  };

  const logOut = () => {
    setAuthorization(false);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box>
      {!isAuthorization
        ? (
          <Button
            onClick={openModal}
            marginLeft="20"
            variant="outline"
            bg="yellow.300"
            color="purple.800"
            _hover={{ bg: 'yellow.200' }}
          >
            Вход
          </Button>
        ) : (
          <Button
            onClick={logOut}
            marginLeft="20"
            variant="outline"
            bg="yellow.300"
            color="purple.800"
            _hover={{ bg: 'yellow.200' }}
          >
            Выйти
          </Button>
        )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex
            align="center"
            justify="center"
          >
            {sign === 'in'
              ? (
                <Box
                  w="100%"
                  rounded="lg"
                  bg="gray.50"
                  boxShadow="lg"
                  p={8}
                >
                  <Heading textAlign="center" mb={4} fontSize="4xl">Войти</Heading>
                  <Stack spacing={4}>
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Пароль</FormLabel>
                      <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h="full">
                          <Button
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align="start"
                        justify="end"
                      >
                        <Button
                          bg="transparent"
                          color="yellow.400"
                          textDecoration="underline"
                          _hover={{
                            color: 'yellow.600',
                          }}
                          onClick={changeModal}
                        >
                          Зарегистрироваться
                        </Button>
                      </Stack>
                      <Text color="red.400">{errorMessage}</Text>
                      <Button
                        bg="purple.800"
                        color="white"
                        _hover={{
                          bg: 'purple.700',
                        }}
                        onClick={() => signIn()}
                      >
                        Войти
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              ) : (
                <Box
                  w="100%"
                  rounded="lg"
                  bg="gray.50"
                  boxShadow="lg"
                  p={8}
                >
                  <Heading textAlign="center" mb={4} fontSize="4xl">Зарегистрироваться</Heading>
                  <Stack spacing={4}>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>Имя</FormLabel>
                      <Input
                        type="text"
                        onChange={handleChangeName}
                      />
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" onChange={handleChangeEmail} />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Пароль</FormLabel>
                      <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} onChange={handleChangePassword} />
                        <InputRightElement h="full">
                          <Button
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align="start"
                        justify="end"
                      >
                        <Button
                          bg="transparent"
                          color="yellow.400"
                          textDecoration="underline"
                          _hover={{
                            color: 'yellow.600',
                          }}
                          onClick={changeModal}
                        >
                          Уже зарегистрированы?
                        </Button>
                      </Stack>
                      <Text color="red.400">{errorMessage}</Text>
                      <Button
                        bg="purple.800"
                        color="white"
                        _hover={{
                          bg: 'purple.700',
                        }}
                        onClick={() => signUp()}
                      >
                        Зарегистрироваться
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              )}
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BtnSignIn;
