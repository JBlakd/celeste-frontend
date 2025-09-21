import { Box, Container, Text, Title, Stack, Badge, Flex } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import { ItemQuantityInput } from './ItemQuantityInput';

export default function ProductSpecificationsAndQuantity({ product }: { product: Product }) {
  return (
    <Box
      style={{
        width: '100%',
      }}
      mb="2rem"
    >
      <Container size="lg">
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap="xl">
          {/* LEFT COLUMN */}
          <Box style={{ flex: 1, minWidth: 280 }}>
            <Title order={4} mb="lg">
              Product Specifications
            </Title>

            <Stack gap={4}>
              <Text c="gray.9" size="sm" fw={500}>
                Range:{' '}
                <Text c="gray.7" span fw={400}>
                  {product.range?.title}
                </Text>
              </Text>
              <Text c="gray.9" size="sm" fw={500}>
                Dimensions:{' '}
                <Text c="gray.7" span fw={400}>
                  {product.dimensions}
                </Text>
              </Text>
              <Text c="gray.9" size="sm" fw={500}>
                Finish:{' '}
                <Text c="gray.7" span fw={400}>
                  {product.finish.join('/')}
                </Text>
              </Text>
              <Text c="gray.9" size="sm" fw={500}>
                SKU:{' '}
                <Text c="gray.7" span fw={400}>
                  {product.sku}
                </Text>
              </Text>
            </Stack>

            {!!product.features?.length && (
              <Flex gap="sm" align="flex-end" mt="0.5rem" wrap="wrap">
                <Text c="gray.9" size="sm" fw={500}>
                  Features:
                </Text>
                {product.features.map((f) => (
                  <Badge key={f} variant="light" color="black" size="sm">
                    {f}
                  </Badge>
                ))}
              </Flex>
            )}
          </Box>

          {/* RIGHT COLUMN */}
          <Stack gap={5} align="flex-end">
            {product.finish.map((finish) => {
              const id = `${product.sku}-${finish === 'Matte' ? 'M' : 'P'}`;
              return (
                <ItemQuantityInput
                  key={finish}
                  id={id}
                  title={product.title}
                  finish={finish}
                  label="full"
                />
              );
            })}
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
