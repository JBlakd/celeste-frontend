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
    <Container size="lg" pt="3rem">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <Card
            key={product._id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => {
              navigate(`/tier/${tierSlug}/${product.slug.current}`);
            }}
            style={{ cursor: 'pointer' }}
          >
            {product.image?.asset?.url && (
              <Card.Section>
                <Image src={product.image.asset.url} height={160} alt={product.title} />
              </Card.Section>
            )}
            <Text fw={500} mt="md">
              {product.title}
            </Text>
            {product.description && (
              <Text size="sm" color="dimmed">
                {product.description}
              </Text>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
