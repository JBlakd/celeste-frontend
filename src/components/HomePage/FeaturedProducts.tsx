import { Carousel } from '@mantine/carousel';
import { Box, Text, Image, useMantineTheme } from '@mantine/core';
import type { HomepageSettings } from '@typedefs/sanity';

export default function FeaturedProducts({
  homepageSettings,
}: {
  homepageSettings: HomepageSettings | null;
}) {
  const theme = useMantineTheme();

  if (!homepageSettings?.featuredProducts) {
    return null;
  }

  return (
    <>
      <Text fw={600} size="lg" mb="md">
        Featured Products
      </Text>
      <Carousel withIndicators height={300} slideSize="33.333333%" slideGap="md">
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
