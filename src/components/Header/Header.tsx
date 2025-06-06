import { Container, Group, Paper, Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import TierMenu from '../TierMenu';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';

export default function SiteHeader() {
  const theme = useMantineTheme();
  const [backgroundColor, setBackgroundColor] = useState(
    theme.colors.transparent[0],
  );

  return (
    <Paper
      className={classes.header}
      style={{ backgroundColor }}
      onMouseEnter={() => {
        setBackgroundColor(theme.white);
      }}
      onMouseLeave={() => setBackgroundColor(theme.colors.transparent[0])}
    >
      <Container size="lg" className={classes.container}>
        <Title order={3}>Celeste Stone</Title>
        <Group className={classes.navGroup}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${classes.navLink} ${classes.navLinkActive}`
                : classes.navLink
            }
          >
            Home
          </NavLink>
          <TierMenu />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${classes.navLink} ${classes.navLinkActive}`
                : classes.navLink
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? `${classes.navLink} ${classes.navLinkActive}`
                : classes.navLink
            }
          >
            Contact
          </NavLink>
        </Group>
      </Container>
    </Paper>
  );
}
