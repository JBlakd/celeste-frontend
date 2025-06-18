import { Box, Container, Flex, Text, Title, useMantineTheme } from '@mantine/core';
import type { Product } from '@typedefs/sanity';

export default function ProductDescription({ product }: { product: Product }) {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        width: '100%',
      }}
      px="2rem"
    >
      <Container size="lg" py="xl">
        <Flex gap="xs">
          <Title order={2} c={theme.colors.celesteGold[5]}>
            {product.title}
          </Title>
          <Title order={2} c="gray.7">
            |
          </Title>
          <Title order={2} c={theme.colors.celesteGold[5]}>
            {product.sku}
          </Title>
        </Flex>
        <Text mt="md" c="gray.7">
          {product.description}
        </Text>
      </Container>
    </Box>
  );
}
