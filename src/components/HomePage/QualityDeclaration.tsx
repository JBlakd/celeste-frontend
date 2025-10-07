import { Box, Container, Flex, Image, Text, useMantineTheme, rem } from '@mantine/core';
import CrystallineSilicaFreeLogoTransparentBackground from '@assets/CrystallineSilicaFreeLogoTransparentBackground.png';
import LogoNataTransparentBackground from '@assets/LogoNataTransparentBackground.webp';
import LogoSGSTransparentBackground from '@assets/LogoSGSTransparentBackground.webp';
import { useMediaQuery } from '@mantine/hooks';

function Logos() {
  return (
    <>
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
      <Image
        src={LogoNataTransparentBackground}
        alt="Logo Nata"
        w={120}
        h={120}
        fit="contain"
        style={{
          marginTop: rem(8),
          marginBottom: rem(8),
          flexShrink: 0,
        }}
      />
      <Image
        src={LogoSGSTransparentBackground}
        alt="Logo SGS"
        w={120}
        h={120}
        fit="contain"
        style={{
          marginTop: rem(8),
          marginBottom: rem(8),
          flexShrink: 0,
        }}
      />
    </>
  );
}

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
          {isMobile ? (
            <Flex
              direction="row"
              justify={isMobile ? 'center' : 'flex-start'}
              align="center"
              gap="md"
              wrap="wrap"
              style={{
                flexShrink: 0,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Logos />
            </Flex>
          ) : (
            <Logos />
          )}
          <Text
            size="md"
            fw={500}
            c={theme.colors.coolWhite[0]}
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
