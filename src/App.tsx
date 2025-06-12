import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';

function AppRoutes() {
  return useRoutes(routes);
}

const theme = createTheme({
  primaryColor: 'celesteGold',
  black: '#1E1A17',
  white: '#FFFFFF',
  colors: {
    transparent: [
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
    ],
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
    coolWhite: [
      '#FAFAFA',
      '#F7F8F9',
      '#F5F6F7',
      '#F3F4F5',
      '#F1F2F3',
      '#F0F1F2',
      '#E6E7E9',
      '#DCDDDF',
      '#D1D2D4',
      '#C4C5C7',
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
