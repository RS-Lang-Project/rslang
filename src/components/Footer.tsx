import { FC } from 'react';
import {
  Box,
  Container,
  Stack,
  Link,
  Text,
  Image,
} from '@chakra-ui/react';
import rsLogo from '../assets/svg/RSLink.svg';
import FooterLink from './FooterLink';

const Footer: FC = () => (
  <Box bg="purple.800">
    <Container
      as={Stack}
      maxWidth="container.xl"
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Link href="https://rs.school/">
        <Image src={rsLogo} alt="rsLogo" />
      </Link>
      <Stack direction="row" spacing={6}>
        <FooterLink label="Dmitriy Nikitenko" href="https://github.com/Dmitriy-hello-world" />
        <FooterLink label="Kateryna Vinskovska" href="https://github.com/Ket1911" />
      </Stack>
      <Text color="#fff" fontWeight="500">© 2022 RS Lang</Text>
    </Container>
  </Box>
);

export default Footer;
