import { useState } from 'react';
import { Container, Image, Paper, Modal, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { Product } from '@typedefs/sanity';
import { useMediaQuery } from '@mantine/hooks';

export default function ProductImages({ product }: { product: Product | null }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!product) return null;

  const mainImageUrl = product.image?.asset?.url;
  const galleryImages = product.gallery?.filter((img) => img.asset?.url);

  return (
    <Container size="lg">
      {/* Main image */}
      <Paper
        radius="sm"
        shadow="sm"
        onClick={() => setSelectedImage(mainImageUrl || null)}
        style={{
          cursor: 'pointer',
          transition: 'box-shadow 0.2s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
      >
        {mainImageUrl && <Image src={mainImageUrl} alt={product.title} mt="2rem" />}
      </Paper>

      {/* Gallery carousel */}
      {galleryImages && galleryImages.length > 0 && (
        <Carousel
          mt="xl"
          slideSize={isMobile ? '66.666666%' : '33.333333%'}
          slideGap="md"
          emblaOptions={{ align: isMobile ? 'center' : 'start', loop: true, dragFree: true }}
          withIndicators
        >
          {galleryImages.map((img, index) => (
            <Carousel.Slide key={img.asset.url}>
              <Box
                onClick={() => setSelectedImage(img.asset.url || null)}
                style={{
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 12px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Image
                  src={img.asset.url}
                  alt={`${product.title} image ${index + 1}`}
                  radius="sm"
                  height={200}
                  fit="cover"
                />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      {/* Modal for full image preview */}
      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="auto"
        centered
        withCloseButton={false}
        withinPortal
        padding={0}
        overlayProps={{
          backgroundOpacity: 0.85,
          blur: 4,
        }}
        styles={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start', // align from top down
            overflow: 'hidden',
            marginTop: '4.5rem', // <-- buffer from header turf
            maxHeight: 'calc(100vh - 4.5rem)', // <-- avoid scroll cut-off
          },
        }}
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Preview"
            style={{
              height: '80vh',
              width: 'auto',
              maxHeight: 'calc(100vh - 8rem)', // extra buffer to avoid footer too
              objectFit: 'contain',
              display: 'block',
            }}
          />
        )}
      </Modal>
    </Container>
  );
}
