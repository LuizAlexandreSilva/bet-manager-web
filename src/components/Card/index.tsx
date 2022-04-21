import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      width="100%"
      bg="whiteAlpha.900"
      p="4"
    >
      {children}
    </Box>
  );
}
