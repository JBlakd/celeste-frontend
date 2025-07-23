import { Carousel } from '@mantine/carousel';
import { Box, Text, Image, useMantineTheme, Title, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { HomepageSettings } from '@typedefs/sanity';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProducts({
  homepageSettings,
}: {
  homepageSettings: HomepageSettings | null;
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  if (!homepageSettings?.featuredProducts) {
    return null;
  }

  return (
    <Container size="lg">
      <Title order={2} mb="md" pl="0.55em">
        Featured Products
      </Title>
      <Carousel
        height={300}
        slideSize={isMobile ? '66.666666%' : '33.333333%'}
        slideGap="md"
        emblaOptions={{
          loop: true,
          dragFree: true,
          align: 'center',
        }}
        styles={{
          control: {
            backgroundColor: theme.colors.gray[3],
            color: 'black',
            width: '3rem',
            height: '3rem',
            marginTop: '4rem',
          },
        }}
      >
        {homepageSettings.featuredProducts.map((prod) => (
          <Carousel.Slide
            key={prod._id}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/${prod.slug.current}`);
            }}
          >
            <Box p="sm" bg={theme.colors.transparent[0]}>
              {prod.image?.asset.url && (
                <Box
                  style={{
                    overflow: 'hidden',
                    borderRadius: theme.radius.md,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Image
                    src={prod.lowRes?.asset.url}
                    alt={prod.title}
                    height={180}
                    fit="cover"
                    style={{
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
              )}
              <Text mt="sm" fw={500} ta="center">
                {prod.title} | {prod.sku}
              </Text>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}
