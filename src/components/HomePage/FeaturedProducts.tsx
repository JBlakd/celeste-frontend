import { Carousel } from '@mantine/carousel';
import { Box, Text, Image, useMantineTheme, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { HomepageSettings } from '@typedefs/sanity';

export default function FeaturedProducts({
  homepageSettings,
}: {
  homepageSettings: HomepageSettings | null;
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!homepageSettings?.featuredProducts) {
    return null;
  }

  return (
    <>
      <Title order={2} mb="md">
        Featured Products
      </Title>
      <Carousel
        withIndicators
        height={300}
        slideSize={isMobile ? '100%' : '33.333333%'}
        slideGap="md"
      >
        {homepageSettings.featuredProducts.map((prod) => (
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
    </>
  );
}
