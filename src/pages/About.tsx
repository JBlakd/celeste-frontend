import { Container, Title, Text } from '@mantine/core';

export default function About() {
  return (
    <>
      <title>Celeste Stone | About Us</title>
      <meta name="description" content="Learn about our mission, vision and partnerships." />
      <link rel="canonical" href="https://celestestone.com.au/about" />
      <Container py="xl">
        <Title order={2} mb="md">
          About Us
        </Title>
        <Text>
          At Celeste Stone, we specialise in premium engineered stone surfaces. Whether it's for
          residential or commercial projects, our mission is to supply high-quality, compliant, and
          visually stunning slabs to the Australian market.
        </Text>
      </Container>
    </>
  );
}
