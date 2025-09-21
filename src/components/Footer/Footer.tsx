import { Box, Container, Group, Image, Stack, Text, Anchor, Divider, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';

// Mobile layout
function MobileFooterContent() {
  return (
    <Stack align="center" gap="xl">
      {/* Logo */}
      <Stack gap={4} align="center">
        <Image
          src={LogoBrandDoubleColorTransparentBackground}
          style={{ height: '3rem', width: 'auto', marginBottom: '1.5rem' }}
        />
        <Text size="sm" fw={700}>
          Showroom and Warehouse:
        </Text>
        <Text size="sm">95 Mandoon Rd, Girraween, 2143 NSW</Text>
      </Stack>

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
        <Text size="sm">(02) 7807 0723</Text>
        <Flex gap="0.3rem">
          <Text size="sm" fw={700}>
            Mon–Fri:
          </Text>
          <Text size="sm">8am–5:30pm</Text>
          <Text size="sm" fw={700}>
            Sat:
          </Text>
          <Text size="sm">9am–3pm</Text>
        </Flex>
      </Stack>
    </Stack>
  );
}

// Desktop layout
function DesktopFooterContent() {
  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      {/* Logo */}
      <Box>
        <Image
          src={LogoBrandDoubleColorTransparentBackground}
          style={{ height: '3rem', width: 'auto', marginBottom: '0.5rem' }}
        />
        <Text size="sm" fw={700}>
          Showroom and Warehouse:
        </Text>
        <Text size="sm">95 Mandoon Rd, Girraween, 2143 NSW</Text>
      </Box>

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
      <Stack gap={4} align="flex-end">
        <Text fw={700}>Contact</Text>
        <Text size="sm">info@celestestone.com.au</Text>
        <Text size="sm">(02) 7807 0723</Text>
        <Flex gap="0.3rem">
          <Text size="sm" fw={700}>
            Mon–Fri:
          </Text>
          <Text size="sm">8am–5:30pm</Text>
          <Text size="sm" fw={700}>
            Sat:
          </Text>
          <Text size="sm">9am–3pm</Text>
        </Flex>
      </Stack>
    </Group>
  );
}

// Bottom credits
function FooterCredits({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <Stack align="center" gap={4}>
        <Text size="xs">© {new Date().getFullYear()} Celeste Stone Group Pty Ltd</Text>
        <Text size="xs">Built with ❤️ in-house at Celeste Stone</Text>
      </Stack>
    );
  }

  return (
    <Group justify="space-between">
      <Text size="xs">© {new Date().getFullYear()} Celeste Stone Group Pty Ltd</Text>
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
        backgroundColor: theme.colors.coolWhite[3],
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
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
