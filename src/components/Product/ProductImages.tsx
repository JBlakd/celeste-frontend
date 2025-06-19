import { useState } from 'react';
import { Container, Image, Paper, Modal, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { Product } from '@typedefs/sanity';
import { useMediaQuery } from '@mantine/hooks';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

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
        mt="2rem"
        shadow="sm"
        onClick={() => setSelectedImage(mainImageUrl || null)}
        style={{
          cursor: 'pointer',
          transition: 'box-shadow 0.2s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          lineHeight: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
      >
        {mainImageUrl && (
          <Box style={{ position: 'relative', display: 'inline-block' }}>
            <Image src={mainImageUrl} alt={product.title} style={{ display: 'block' }} />
            <Box
              style={{
                position: 'absolute',
                bottom: '0.5rem',
                right: '0.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                borderRadius: '4px',
                pointerEvents: 'none',
                height: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Whole Slab
            </Box>
          </Box>
        )}
      </Paper>
      {/* Gallery carousel */}
      {galleryImages && galleryImages.length > 0 && (
        <Carousel
          mt="xl"
          slideSize={isMobile ? '100%' : '33.333333%'}
          slideGap="md"
          emblaOptions={{ align: isMobile ? 'center' : 'start', loop: true, dragFree: true }}
          withControls={isMobile ? galleryImages.length > 1 : galleryImages.length > 3}
        >
          {galleryImages.map((img, index) => (
            <Carousel.Slide key={img.asset.url}>
              <Box
                mb="1rem"
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
        withCloseButton
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
            alignItems: 'start',
            overflow: 'hidden',
            marginTop: '4.5rem',
            maxHeight: 'calc(100vh - 4.5rem)',
          },
          close: {
            position: 'absolute',
            left: '1rem',
            outline: '2px solid',
            outlineColor: 'gray.1',
          },
        }}
      >
        {selectedImage && (
          <Box
            style={{
              height: isMobile ? 'auto' : '80vh',
              width: isMobile ? '80vw' : 'auto',
              ...(isMobile
                ? { maxWidth: 'calc(100vw - 8rem)' }
                : { maxHeight: 'calc(100vh - 8rem)' }),
              display: 'block',
              objectFit: 'contain',
            }}
          >
            <InnerImageZoom
              src={selectedImage}
              zoomSrc={selectedImage}
              zoomType="click"
              zoomScale={1.5}
              zoomPreload
            />
          </Box>
        )}
      </Modal>
    </Container>
  );
}
