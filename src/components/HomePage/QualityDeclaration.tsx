import { Box, Container, Flex, Image, Text, useMantineTheme, rem } from '@mantine/core';
import CrystallineSilicaFreeLogoTransparentBackground from '@assets/CrystallineSilicaFreeLogoTransparentBackground.png';
import { useMediaQuery } from '@mantine/hooks';

export default function QualityDeclaration() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      style={{
        backgroundColor: theme.colors.celesteGold[5],
        width: '100%',
      }}
      px="2rem"
    >
      <Container size="lg" py="xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={{ base: 'xl', md: rem(48) }}
        >
          <Text
            size="xl"
            fw={700}
            c={theme.white}
            maw={{ md: '30%' }}
            ta={{ base: 'center', md: 'left' }}
            lh="lg"
          >
            Engineered without crystalline silica — safer for people, better for the planet.
          </Text>

          <Image
            src={CrystallineSilicaFreeLogoTransparentBackground}
            alt="Crystalline Silica Free badge"
            w={120}
            h={120}
            fit="contain"
            style={{
              marginTop: rem(8),
              marginBottom: rem(8),
              flexShrink: 0,
            }}
          />

          <Text
            size="md"
            fw={500}
            c={theme.white}
            maw={{ md: '30%' }}
            ta={isMobile ? 'center' : 'justify'}
            lh="xs"
          >
            Designed for effortless cutting and finishing, our slabs handle like traditional
            materials, without the health risks. Engineered for dimensional stability, they store
            beautifully over time without warping or compromise.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
