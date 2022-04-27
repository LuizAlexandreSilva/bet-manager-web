import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & BoxProps;

export default function Card({ children, ...props }: Props) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      width="100%"
      bg="whiteAlpha.900"
      p="4"
      {...props}
    >
      {children}
    </Box>
  );
}
