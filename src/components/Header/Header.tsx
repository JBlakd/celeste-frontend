// src/components/Header/Header.tsx
import { Container, Group, Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

export default function SiteHeader() {
  return (
    <header className={classes.header}>
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
    </header>
  );
}
