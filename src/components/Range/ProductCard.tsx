import { ItemQuantityInputLazy } from '@components/Product/ItemQuantityInputLazy';
import { useMantineTheme, Card, Image, Text, Flex, Divider, Anchor } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FullContent({ product, imageUrl }: { product: Product; imageUrl: string | undefined }) {
  return (
    <>
      {imageUrl && (
        <Card.Section>
          <Image
            src={imageUrl}
            height={160}
            alt={product.title}
            style={{
              imageRendering: 'crisp-edges',
              filter: 'blur(0.5px)',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
        </Card.Section>
      )}

      <Flex align="center" justify="space-between" mt="md">
        <Text fw={500}>
          {product.title} | {product.sku}
        </Text>
      </Flex>

      {product.description && (
        <Text size="sm" c="dimmed" lineClamp={3}>
          {product.description}
        </Text>
      )}
    </>
  );
}

function CondensedContent({
  product,
  imageUrl,
}: {
  product: Product;
  imageUrl: string | undefined;
}) {
  return (
    <>
      {imageUrl && (
        <Card.Section>
          <Image
            src={imageUrl}
            height={160}
            alt={product.title}
            style={{
              imageRendering: 'crisp-edges',
              filter: 'blur(0.5px)',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
        </Card.Section>
      )}

      <Flex align="center" justify="space-between" mt="md">
        <Text fw={500}>
          {product.title} | {product.sku}
        </Text>
      </Flex>

      <Divider
        my="0.35rem"
        size="xs"
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.10)',
          opacity: 0.7,
        }}
      />

      <Flex gap="xs" wrap="wrap">
        {product.finish?.map((finish) => {
          const id = `${product.sku}-${finish === 'Matte' ? 'M' : 'P'}`;
          return (
            <ItemQuantityInputLazy
              key={finish}
              id={id}
              title={product.title}
              finish={finish}
              label="condensed"
            />
          );
        })}
      </Flex>
    </>
  );
}

function ProductCardInternal({
  product,
  condensed = false,
}: {
  product: Product;
  condensed?: boolean;
}) {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();
    navigate(`/${product.slug.current}`);
  };

  const imageUrl = product.lowRes?.asset?.url;

  return (
    <Anchor
      href={`/${product.slug.current}`}
      onClick={handleCardClick}
      style={{ display: 'block' }} // full-width clickable
      underline="never"
    >
      <Card
        key={product._id}
        shadow="sm"
        padding="md"
        radius="md"
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          backgroundColor: theme.colors.coolWhite?.[0] || theme.white,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          maxWidth: condensed ? 500 : undefined,
        }}
        onMouseEnter={(e) => {
          if (condensed) return;
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.20)';
        }}
        onMouseLeave={(e) => {
          if (condensed) return;
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.12)';
        }}
      >
        {condensed ? (
          <CondensedContent product={product} imageUrl={imageUrl} />
        ) : (
          <FullContent product={product} imageUrl={imageUrl} />
        )}
      </Card>
    </Anchor>
  );
}

export default React.memo(
  ProductCardInternal,
  (prev, next) => JSON.stringify(prev.product) === JSON.stringify(next.product),
);
