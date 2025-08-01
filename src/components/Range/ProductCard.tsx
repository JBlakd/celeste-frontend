import { useMantineTheme, Card, Image, Text } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  return (
    <Card
      key={product._id}
      shadow="sm"
      padding="lg"
      radius="md"
      onClick={() => {
        navigate(`/${product.slug.current}`);
      }}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: theme.colors.coolWhite[0],
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
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
      {product.image?.asset?.url && (
        <Card.Section>
          <Image
            src={product.lowRes?.asset.url}
            height={160}
            alt={product.title}
            style={{ imageRendering: 'crisp-edges', filter: 'blur(0.5px)' }}
          />
        </Card.Section>
      )}
      <Text fw={500} mt="md">
        {product.title} | {product.sku}
      </Text>
      {product.description && (
        <Text size="sm" c="dimmed" lineClamp={3}>
          {product.description}
        </Text>
      )}
    </Card>
  );
}
