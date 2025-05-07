import { Box, Container, Group, Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <Box
      component="header"
      style={(theme) => ({
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: theme.white,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      })}
      px="md"
      py="sm"
    >
      <Container
        size="lg"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title order={3}>Celeste Stone</Title>
        <Group gap="lg">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Group>
      </Container>
    </Box>
  );
}
