import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import AppProvider from './hooks';
import Routes from './routes';
import { theme } from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
