import { Container, Image, Paper } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { Product } from '@typedefs/sanity';

export default function ProductImages({ product }: { product: Product | null }) {
  if (!product) {
    return null;
  }

  const mainImageUrl = product.image?.asset?.url;
  const galleryImages = product.gallery?.filter((img) => img.asset?.url);

  return (
    <Container size="lg">
      {/* Main image */}
      <Paper radius="sm" shadow="sm">
        {mainImageUrl && <Image src={mainImageUrl} alt={product.title} mt="2rem" />}
      </Paper>

      {/* Gallery carousel */}
      {galleryImages && galleryImages.length > 0 && (
        <Carousel
          mt="xl"
          slideSize="33.333333%"
          slideGap="md"
          emblaOptions={{ align: 'start', loop: true, dragFree: true }}
          withIndicators
        >
          {galleryImages.map((img, index) => (
            <Carousel.Slide key={index}>
              <Image src={img.asset?.url} alt={`${product.title} image ${index + 1}`} radius="sm" />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Container>
  );
}
