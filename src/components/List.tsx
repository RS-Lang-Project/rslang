import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { Word } from '../requests/requestTypes';

interface ListProps {
  items: Word[] | undefined;
  renderItems: (item: Word) => React.ReactNode;
}

const List: FC<ListProps> = ({ items, renderItems }) => (
  <Box>
    {items?.map(renderItems)}
  </Box>
);

export default List;
