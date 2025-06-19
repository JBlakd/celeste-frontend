import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { useRef, useState, useEffect } from 'react';

export interface OutletContext {
  headerHeight: number;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

export default function RootLayout() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => setHeaderHeight(headerRef.current!.offsetHeight);

      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  return (
    <Box pos="relative" mih="100vh" display="flex" style={{ flexDirection: 'column' }}>
      <Header headerRef={headerRef} />
      <Box style={{ flex: 1 }}>
        <Outlet context={{ headerHeight, headerRef }} />
      </Box>
      <Footer />
    </Box>
  );
}
