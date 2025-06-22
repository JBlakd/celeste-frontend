import { useState } from 'react';
import { Image, Loader, Center } from '@mantine/core';

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

  // Final size to use during loading state
  const placeholderWidth = width ?? fallbackWidth;
  const placeholderHeight = height ?? fallbackHeight;

  // If there's no src at all, don't even try to render the image
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
    <Center
      style={{
        width: placeholderWidth,
        height: placeholderHeight,
        backgroundColor: '#f1f3f5',
        borderRadius: radius,
        position: 'relative',
      }}
    >
      <Loader size="sm" />
      {/* Hidden preload image */}
      <img
        src={src}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </Center>
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
