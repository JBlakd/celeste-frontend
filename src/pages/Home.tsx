import { sanity } from '@lib/sanity';
import { Box, Container, SimpleGrid } from '@mantine/core';
import type { Homepage } from '@typedefs/sanity';
import { useState, useEffect } from 'react';
import classes from '@layouts/RootLayout.module.css';

export default function Home() {
  const [settings, setSettings] = useState<Homepage | null>(null);

  useEffect(() => {
    sanity
      .fetch<Homepage>(
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
    <Container>
      <>
        <Box className={classes.heroVideoWrap}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={classes.heroVideo}
            src={settings?.heroVideo?.asset.url}
          />
        </Box>
        <Box className={classes.heroOverlay} />
      </>
      <SimpleGrid cols={3} spacing="lg">
        {/* SlabCard components go here */}
      </SimpleGrid>
    </Container>
  );
}
