import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container } from '@mantine/core';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import classes from './RootLayout.module.css';
import { sanity } from '../lib/sanity';

interface HomepageSettings {
  heroVideo: {
    asset: {
      url: string;
    };
  };
  headline?: string;
  subtext?: string;
}

export default function RootLayout() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const location = useLocation();

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "homepage"][0]{
          headline,
          subtext,
          heroVideo{
            asset->{
              url
            }
          }
        }`,
      )
      .then((res) => setSettings(res))
      .catch((err) => console.error('Couldn’t fetch homepage settings:', err));
  }, []);

  return (
    <Box
      pos="relative"
      mih="100vh"
      display="flex"
      style={{ flexDirection: 'column' }} // vertical stack
    >
      {location.pathname === '/' && settings?.heroVideo?.asset?.url && (
        <>
          <Box className={classes.heroVideoWrap}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={classes.heroVideo}
              src={settings.heroVideo.asset.url}
            />
          </Box>
          <Box className={classes.heroOverlay} />
        </>
      )}
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
