import { SimpleGrid, Container } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  condensed,
}: {
  products: Product[] | null;
  condensed?: boolean;
}) {
  if (!products) {
    return null;
  }

  return (
    <Container size="lg" mb="2rem">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {products
          .sort((a, b) => b.rank - a.rank)
          .map((product) => (
            <ProductCard key={product._id} product={product} condensed={condensed} />
          ))}
      </SimpleGrid>
    </Container>
  );
}
