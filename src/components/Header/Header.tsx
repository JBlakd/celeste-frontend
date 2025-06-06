import { Container, Group, Paper, Image } from '@mantine/core';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import TierMenu from '../TierMenu';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import LogoBrandWhiteTransparentBackground from '@assets/LogoBrandWhiteTransparentBackground.png';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';

export default function SiteHeader() {
  const theme = useMantineTheme();
  const [backgroundColor, setBackgroundColor] = useState(
    theme.colors.transparent[0],
  );
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      className={classes.header}
      style={{ backgroundColor }}
      onMouseEnter={() => {
        if (location.pathname !== '/') {
          return;
        }

        setBackgroundColor(theme.white);
      }}
      onMouseLeave={() => {
        if (location.pathname !== '/') {
          return;
        }

        setBackgroundColor(theme.colors.transparent[0]);
      }}
    >
      <Container size="lg" className={classes.container}>
        <Paper
          style={{
            cursor: 'pointer',
            backgroundColor: theme.colors.transparent[0],
          }}
        >
          <Image
            src={
              backgroundColor === theme.white
                ? LogoBrandDoubleColorTransparentBackground
                : LogoBrandWhiteTransparentBackground
            }
            style={{ height: '3rem', width: 'auto' }}
            onClick={() => {
              navigate('/');
            }}
          />
        </Paper>

        <Group className={classes.navGroup}>
          <NavLink
            to="/"
            className={classes.navLink}
            style={{
              color:
                backgroundColor === theme.white ? theme.black : theme.white,
            }}
          >
            Home
          </NavLink>
          <TierMenu headerBackgroundColor={backgroundColor} />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${classes.navLink} ${classes.navLinkActive}`
                : classes.navLink
            }
            style={{
              color:
                backgroundColor === theme.white ? theme.black : theme.white,
            }}
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
            style={{
              color:
                backgroundColor === theme.white ? theme.black : theme.white,
            }}
          >
            Contact
          </NavLink>
        </Group>
      </Container>
    </Paper>
  );
}
