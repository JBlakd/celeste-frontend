import { Box, Container, Flex, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { Product } from '@typedefs/sanity';

export default function ProductDescription({ product }: { product: Product }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  console.log(product);

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <Container size="lg" py="xl">
        <Flex gap="xs">
          <Title size={isMobile ? 'lg' : 'xl'} order={2} c={theme.colors.celesteGold[5]}>
            {product.title}
          </Title>
          <Title size={isMobile ? 'lg' : 'xl'} order={2} c="gray.7">
            |
          </Title>
          <Title size={isMobile ? 'lg' : 'xl'} order={2} c={theme.colors.celesteGold[5]}>
            {product.sku}
          </Title>
        </Flex>
        <Text size={isMobile ? 'sm' : 'md'} mt="md" c="gray.7">
          {product.description}
        </Text>
      </Container>
    </Box>
  );
}
