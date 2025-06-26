import { useState } from 'react';
import { Image, Loader, Center, Box } from '@mantine/core';

export function ImageWithLoader({
  src,
  alt = '',
  height,
  width,
  radius,
  fit = 'cover',
  style,
}: {
  src?: string;
  alt?: string;
  height?: number | string;
  width?: number | string;
  radius?: number | string;
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  style?: React.CSSProperties;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const fallbackWidth = 300;
  const fallbackHeight = 200;

  const placeholderWidth = width ?? fallbackWidth;
  const placeholderHeight = height ?? fallbackHeight;

  if (!src) {
    return (
      <Center
        style={{
          width: placeholderWidth,
          height: placeholderHeight,
          backgroundColor: '#f1f3f5',
          borderRadius: radius,
        }}
      >
        <Loader size="sm" />
      </Center>
    );
  }

  return isLoading ? (
    <Box
      style={{
        width: placeholderWidth,
        height: placeholderHeight,
        backgroundColor: '#f1f3f5',
        borderRadius: radius,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <Loader size="sm" />
      <img
        src={src}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </Box>
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      radius={radius}
      fit={fit}
      style={style}
    />
  );
}
