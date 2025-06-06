import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';

function AppRoutes() {
  return useRoutes(routes);
}

const theme = createTheme({
  primaryColor: 'celesteGold',
  colors: {
    celesteGold: [
      '#F4EDE6',
      '#EADCCC',
      '#DFCAB3',
      '#D5B999',
      '#CBA880',
      '#BC9C79',
      '#A68365',
      '#8F6A50',
      '#79543D',
      '#63402D',
    ],
  },
  primaryShade: { light: 5, dark: 7 },
});

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
}
