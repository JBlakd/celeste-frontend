import { MantineProvider } from '@mantine/core';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
}
