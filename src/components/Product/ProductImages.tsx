import { useState } from 'react';
import { Container, Paper, Modal, Box, Loader, useMantineTheme } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { Product } from '@typedefs/sanity';
import { useMediaQuery } from '@mantine/hooks';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useOutletContext } from 'react-router-dom';
import type { OutletContext } from '@layouts/RootLayout';
import { ImageWithLoader } from '@lib/ImageWithLoader';

export default function ProductImages({ product }: { product: Product | null }) {
  const theme = useMantineTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalImageLoading, setModalImageLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { headerRef } = useOutletContext<OutletContext>();

  if (!product) return null;

  const mainImageUrl = product.image?.asset?.url || null;
  const galleryImages = [
    ...(product.lowResZoomed?.asset?.url ? [product.lowResZoomed] : []),
    ...(product.gallery?.filter((img) => img.asset?.url) || []),
  ];

  const handleModalOpen = () => {
    if (headerRef.current) headerRef.current.style.display = 'none';
  };

  const handleModalClose = () => {
    if (headerRef.current) headerRef.current.style.display = '';
  };

  const openModalWithImage = (url: string | null) => {
    if (url) {
      setModalImageLoading(true);
      setSelectedImage(url);
      handleModalOpen();
    }
  };

  return (
    <Container size="lg">
      <Paper
        mt="2rem"
        shadow="sm"
        onClick={() => openModalWithImage(mainImageUrl)}
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
            <ImageWithLoader src={mainImageUrl} alt={product.title} style={{ display: 'block' }} />
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

      {galleryImages.length > 0 && (
        <Carousel
          mt="xl"
          slideSize={isMobile ? '66.666666%' : '33.333333%'}
          slideGap="md"
          emblaOptions={{ align: isMobile ? 'center' : 'start', loop: true, dragFree: true }}
          withControls={isMobile ? galleryImages.length > 1 : galleryImages.length > 3}
          styles={{
            control: {
              backgroundColor: theme.colors.gray[3],
              color: 'black',
              width: '3rem',
              height: '3rem',
            },
          }}
        >
          {galleryImages.map((img, index) => {
            const imgUrl =
              index === 0 ? product.highResZoomed?.asset.url || null : img?.asset.url || null;

            return (
              <Carousel.Slide key={img?.asset.url}>
                <Box
                  mb="1rem"
                  onClick={() => openModalWithImage(imgUrl)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 12px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <ImageWithLoader
                    src={img?.asset.url}
                    alt={`${product.title} image ${index + 1}`}
                    radius="sm"
                    height={200}
                    fit="cover"
                    style={
                      index === 0
                        ? { imageRendering: 'crisp-edges', filter: 'blur(0.5px)' }
                        : undefined
                    }
                  />
                  {index === 0 && (
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
                      Zoomed Portion
                    </Box>
                  )}
                </Box>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}

      <Modal
        opened={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setModalImageLoading(false);
          handleModalClose();
        }}
        keepMounted
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              maxHeight: '90vh',
              maxWidth: '90vw',
            }}
          >
            <Box
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {modalImageLoading ? (
                <Paper w="80vw" h="80vh">
                  <Box
                    style={{
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Loader size="xl" />
                  </Box>
                </Paper>
              ) : (
                <InnerImageZoom
                  src={selectedImage}
                  zoomSrc={selectedImage}
                  zoomType="click"
                  zoomScale={1.5}
                  zoomPreload
                  imgAttributes={{
                    style: {
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                    },
                  }}
                />
              )}

              {/* Invisible preload image to trigger load event */}
              {modalImageLoading && (
                <img
                  src={selectedImage}
                  alt="preloading"
                  style={{ display: 'none' }}
                  onLoad={() => setModalImageLoading(false)}
                />
              )}
            </Box>
          </Box>
        )}
      </Modal>
    </Container>
  );
}
