import type { Tier } from '@typedefs/sanity';
import { Box, Container, Title, Overlay, useMantineTheme } from '@mantine/core';

export default function TierHero({ tier }: { tier: Tier | null }) {
  const theme = useMantineTheme();

  if (!tier) return null;

  const heroImageUrl = tier.heroImage?.asset?.url;

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '12rem',
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
      px="2rem"
      mb="xl"
    >
      {/* translucent overlay */}
      <Overlay
        gradient="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)"
        opacity={1}
        zIndex={0}
      />
      <Container
        size="lg"
        style={{
          height: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        py="xl"
      >
        <Title order={1} c={theme.white}>
          {tier.title} Range
        </Title>
      </Container>
    </Box>
  );
}
