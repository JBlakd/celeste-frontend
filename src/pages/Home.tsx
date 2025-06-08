import { sanity } from '@lib/sanity';
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import type { Homepage } from '@typedefs/sanity';
import { useState, useEffect } from 'react';
import classes from '@layouts/RootLayout.module.css';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

export default function Home() {
  const [settings, setSettings] = useState<Homepage | null>(null);
  const theme = useMantineTheme();

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
          },
          featuredProducts[]->{
            _id,
            title,
            slug,
            image{
              asset->{
                url
              }
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
      <Box mt="xl">
        <Text size="xl" fw={700} mb="sm">
          {settings?.heroText}
        </Text>
        {settings?.ctaButtonLabel && settings?.ctaButtonLink && (
          <Button
            component="a"
            href={settings.ctaButtonLink}
            variant="filled"
            color="dark"
          >
            {settings.ctaButtonLabel}
          </Button>
        )}
      </Box>

      {settings?.featuredProducts?.length && (
        <Box mt="xl">
          <Text fw={600} size="lg" mb="md">
            Featured Products
          </Text>
          <Carousel
            withIndicators
            height={300}
            slideSize="33.333333%"
            slideGap="md"
          >
            {settings.featuredProducts.map((prod) => (
              <Carousel.Slide key={prod._id}>
                <Box p="sm" bg={theme.colors.transparent[0]}>
                  {prod.image?.asset.url && (
                    <Image
                      src={prod.image.asset.url}
                      alt={prod.title}
                      radius="md"
                      height={180}
                      fit="cover"
                    />
                  )}
                  <Text mt="sm" fw={500}>
                    {prod.title}
                  </Text>
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      )}
    </Container>
  );
}
