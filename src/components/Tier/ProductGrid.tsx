import { SimpleGrid, Card, Image, Text, Container } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import { useNavigate } from 'react-router-dom';

export default function ProductGrid({
  products,
  tierSlug,
}: {
  products: Product[] | null;
  tierSlug: string | undefined;
}) {
  const navigate = useNavigate();

  if (!products) {
    return null;
  }

  return (
    <Container size="lg">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <Card
            key={product._id}
            shadow="sm"
            padding="lg"
            radius="md"
            onClick={() => {
              navigate(`/tier/${tierSlug}/${product.slug.current}`);
            }}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }}
          >
            {product.image?.asset?.url && (
              <Card.Section>
                <Image src={product.image.asset.url} height={160} alt={product.title} />
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
        ))}
      </SimpleGrid>
    </Container>
  );
}
