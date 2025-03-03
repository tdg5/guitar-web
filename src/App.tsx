import '@mantine/core/styles.css';
import '@/App.css';

import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </StrictMode>
  );
}
