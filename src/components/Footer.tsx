import {
  Box,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Anchor,
  Divider,
} from '@mantine/core';

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      style={(theme) => ({
        borderTop: `1px solid ${theme.colors.gray[3]}`,
        backgroundColor: theme.white,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        marginTop: theme.spacing.xl,
      })}
    >
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap="xs">
              <Text fw={700}>Celeste Stone</Text>
              <Text size="sm">
                Engineered surfaces for tomorrow’s homes. Supplying top-tier
                slabs across Australia.
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap={4}>
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
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap={4}>
              <Text fw={700}>Contact</Text>
              <Text size="sm">Scarlett Zeng</Text>
              <Text size="sm">scarlettz@celestestone.com.au</Text>
              <Text size="sm">Mon–Fri: 8am–5pm</Text>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" />

        <Group justify="space-between">
          <Text size="xs">
            © {new Date().getFullYear()} Celeste Stone Group Pty Ltd
          </Text>
          <Text size="xs">Built with ❤️ in-house by us at Celeste Stone</Text>
        </Group>
      </Container>
    </Box>
  );
}
