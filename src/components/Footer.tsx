import {
  Box,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Anchor,
  Divider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';

// Mobile layout
function MobileFooterContent() {
  return (
    <Stack align="center" gap="xl">
      {/* Logo */}
      <Image
        src={LogoBrandDoubleColorTransparentBackground}
        style={{ height: '3rem', width: 'auto' }}
      />

      {/* Navigation */}
      <Stack gap={4} align="center">
        <Text fw={700}>Navigation</Text>
        <Anchor href="/" size="sm">
          Home
        </Anchor>
        <Anchor href="/about" size="sm">
          About
        </Anchor>
        <Anchor href="/contact" size="sm">
          Contact
        </Anchor>
      </Stack>

      {/* Contact */}
      <Stack gap={4} align="center">
        <Text fw={700}>Contact</Text>
        <Text size="sm">info@celestestone.com.au</Text>
        <Text size="sm">Mon–Fri: 8am–5pm</Text>
      </Stack>
    </Stack>
  );
}

// Desktop layout
function DesktopFooterContent() {
  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      {/* Logo */}
      <Box style={{ flexBasis: '30%' }}>
        <Image
          src={LogoBrandDoubleColorTransparentBackground}
          style={{ height: '3rem', width: 'auto' }}
        />
      </Box>

      {/* Navigation */}
      <Box style={{ flexBasis: '30%', textAlign: 'center' }}>
        <Stack gap={4} align="center">
          <Text fw={700}>Navigation</Text>
          <Anchor href="/" size="sm">
            Home
          </Anchor>
          <Anchor href="/about" size="sm">
            About
          </Anchor>
          <Anchor href="/contact" size="sm">
            Contact
          </Anchor>
        </Stack>
      </Box>

      {/* Contact */}
      <Box style={{ flexBasis: '30%', textAlign: 'right' }}>
        <Stack gap={4} align="flex-end">
          <Text fw={700}>Contact</Text>
          <Text size="sm">info@celestestone.com.au</Text>
          <Text size="sm">Mon–Fri: 8am–5pm</Text>
        </Stack>
      </Box>
    </Group>
  );
}

// Bottom credits
function FooterCredits({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <Stack align="center" gap={4}>
        <Text size="xs">
          © {new Date().getFullYear()} Celeste Stone Group Pty Ltd
        </Text>
        <Text size="xs">Built with ❤️ in-house at Celeste Stone</Text>
      </Stack>
    );
  }

  return (
    <Group justify="space-between">
      <Text size="xs">
        © {new Date().getFullYear()} Celeste Stone Group Pty Ltd
      </Text>
      <Text size="xs">Built with ❤️ in-house at Celeste Stone</Text>
    </Group>
  );
}

export default function SiteFooter() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  let FooterContent;
  if (isMobile) {
    FooterContent = <MobileFooterContent />;
  } else {
    FooterContent = <DesktopFooterContent />;
  }

  return (
    <Box
      component="footer"
      style={(theme) => ({
        borderTop: `1px solid ${theme.colors.gray[3]}`,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        marginTop: theme.spacing.xl,
      })}
    >
      <Container size="lg">
        {FooterContent}
        <Divider my="xl" />
        <FooterCredits isMobile={!!isMobile} />
      </Container>
    </Box>
  );
}
