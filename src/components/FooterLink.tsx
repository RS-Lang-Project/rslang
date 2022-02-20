import { FC } from 'react';
import {
  Link,
} from '@chakra-ui/react';

interface FooterLinkProps {
  label: string;
  href: string;
}

const FooterLink: FC<FooterLinkProps> = ({ label, href }) => (
  <Link
    cursor="pointer"
    color="#fff"
    fontWeight="500"
    href={href}
    _hover={{
      textDecoration: 'none',
      color: 'yellow.300',
    }}
  >
    {label}
  </Link>
);

export default FooterLink;
