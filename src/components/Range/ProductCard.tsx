import { ItemQuantityInput } from '@components/Product/ItemQuantityInput';
import { useMantineTheme, Card, Image, Text, Flex } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import { useNavigate } from 'react-router-dom';

function FullContent({ product, imageUrl }: { product: Product; imageUrl: string | undefined }) {
  return (
    // 🔸 Full layout
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

      <Flex gap="xs" wrap="wrap">
        {product.finish?.map((finish) => (
          <ItemQuantityInput
            key={finish}
            id={product._id}
            title={product.title}
            finish={finish}
            label="condensed"
          />
        ))}
      </Flex>
    </>
  );
}

export default function ProductCard({
  product,
  condensed = false,
}: {
  product: Product;
  condensed?: boolean;
}) {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleCardClick = () => {
    navigate(`/${product.slug.current}`);
  };

  const imageUrl = product.lowRes?.asset?.url;

  return (
    <Card
      key={product._id}
      shadow="sm"
      padding="md"
      radius="md"
      onClick={handleCardClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: theme.colors.coolWhite?.[0] || theme.white,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        maxWidth: condensed ? 500 : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.20)';
      }}
      onMouseLeave={(e) => {
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
  );
}
