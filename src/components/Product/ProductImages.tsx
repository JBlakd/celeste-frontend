import { Container, Image, Paper } from '@mantine/core';
import type { Product } from '@typedefs/sanity';

export default function ProductImages({ product }: { product: Product | null }) {
  if (!product) {
    return null;
  }

  return (
    <Container size="lg">
      <Paper radius="sm" shadow="sm">
        <Image src={product.image?.asset?.url} alt={product.title} mt="2rem" />
      </Paper>
    </Container>
  );
}
