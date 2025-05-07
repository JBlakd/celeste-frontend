import { Container, Title, Text, SimpleGrid } from '@mantine/core';

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Celeste Stone</Title>
      <Text mb="xl">Premium Engineered Stone Slabs for Your Next Project</Text>

      <SimpleGrid cols={3} spacing="lg">
        {/* SlabCard components go here */}
      </SimpleGrid>
    </Container>
  );
}
