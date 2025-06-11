import type { Tier } from '@typedefs/sanity';
import { Box, Container, useMantineTheme } from '@mantine/core';

export default function TierHero({ tier }: { tier: Tier | null }) {
  const theme = useMantineTheme();

  if (!tier) {
    return null;
  }

  return (
    <Box
      style={{
        backgroundColor: theme.colors.celesteGold[5],
        width: '100%',
      }}
      px="2rem"
    >
      <Container size="lg" py="xl">
        Products in the {tier?.title} range
      </Container>
    </Box>
  );
}
