import { Box, Container, Text, Title, useMantineTheme, Stack, Badge, Group } from '@mantine/core';
import type { Product } from '@typedefs/sanity';

export default function ProductSpecifications({ product }: { product: Product }) {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        width: '100%',
      }}
      mb="2rem"
    >
      <Container size="lg">
        <Title order={4} mb="sm" style={{ color: theme.colors.gray[8] }}>
          Product Specifications
        </Title>

        <Stack gap={4}>
          <Text size="sm" fw={500}>
            Dimensions:{' '}
            <Text span fw={400}>
              {product.dimensions}
            </Text>
          </Text>
          <Text size="sm" fw={500}>
            Finish:{' '}
            <Text span fw={400}>
              {product.finish}
            </Text>
          </Text>
          <Text size="sm" fw={500}>
            SKU:{' '}
            <Text span fw={400}>
              {product.sku}
            </Text>
          </Text>
        </Stack>

        {!!product.features?.length && (
          <Group gap="xs" mt="sm" wrap="wrap" align="center">
            <Text size="sm" fw={500} style={{ marginRight: 4 }}>
              Features:
            </Text>
            {product.features.map((f) => (
              <Badge key={f} variant="light" color="black" size="sm">
                {f}
              </Badge>
            ))}
          </Group>
        )}
      </Container>
    </Box>
  );
}
