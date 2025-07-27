import { Box, Container, Text, Title, Stack, Badge, Flex } from '@mantine/core';
import type { Product } from '@typedefs/sanity';
import { ItemQuantityInput } from './ItemQuantityInput';

export default function ProductSpecifications({ product }: { product: Product }) {
  console.log('ProductSpecifications', product);

  return (
    <Box
      style={{
        width: '100%',
      }}
      mb="2rem"
    >
      <Container size="lg">
        <Flex justify="space-between">
          <>
            <Title order={4} mb="sm">
              Product Specifications
            </Title>

            <Stack gap={4}>
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
              <Flex gap="sm" align="flex-end" mt="0.25rem">
                <Text c="gray.9" size="sm" fw={500} style={{ marginRight: 4 }}>
                  Features:
                </Text>
                {product.features.map((f) => (
                  <Badge key={f} variant="light" color="black" size="sm">
                    {f}
                  </Badge>
                ))}
              </Flex>
            )}
          </>
          <>
            {product.finish.map((finish) => {
              const id = `${product.sku}-${finish === 'Matte' ? 'M' : 'P'}`;

              return (
                <ItemQuantityInput key={finish} id={id} title={product.title} finish={finish} />
              );
            })}
          </>
        </Flex>
      </Container>
    </Box>
  );
}
