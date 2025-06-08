import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mantine/core';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <Box
      pos="relative"
      mih="100vh"
      display="flex"
      style={{ flexDirection: 'column' }} // vertical stack
    >
      <Header />
      <Box style={{ flex: 1 }}>
        <Container size="lg">
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
