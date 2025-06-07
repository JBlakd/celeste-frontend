import { Container, Group, Paper, Image, Burger, Menu } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import TierMenu from '../TierMenu';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import LogoBrandWhiteTransparentBackground from '@assets/LogoBrandWhiteTransparentBackground.png';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';
import StyledNavLink from './StyledNavLink';
import { useMediaQuery } from '@mantine/hooks';

function MobileMenu({
  backgroundColor,
  navigate,
  menuOpened,
  setMenuOpened,
}: {
  backgroundColor: string;
  navigate: (path: string) => void;
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
}) {
  return (
    <Menu
      opened={menuOpened}
      onChange={setMenuOpened}
      shadow="md"
      width={200}
      position="bottom-end"
    >
      <Menu.Target>
        <Burger
          opened={menuOpened}
          onClick={() => setMenuOpened((o) => !o)}
          aria-label="Toggle navigation"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate('/')}>Home</Menu.Item>
        <Menu.Item>
          <TierMenu headerBackgroundColor={backgroundColor} />
        </Menu.Item>
        <Menu.Item onClick={() => navigate('/about')}>About</Menu.Item>
        <Menu.Item onClick={() => navigate('/contact')}>Contact</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function DesktopMenu({ backgroundColor }: { backgroundColor: string }) {
  return (
    <Group className={classes.navGroup}>
      <StyledNavLink
        to="/"
        className={classes.navLink}
        headerBackgroundColor={backgroundColor}
      >
        Home
      </StyledNavLink>
      <TierMenu headerBackgroundColor={backgroundColor} />
      <StyledNavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? `${classes.navLink} ${classes.navLinkActive}`
            : classes.navLink
        }
        headerBackgroundColor={backgroundColor}
      >
        About
      </StyledNavLink>
      <StyledNavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? `${classes.navLink} ${classes.navLinkActive}`
            : classes.navLink
        }
        headerBackgroundColor={backgroundColor}
      >
        Contact
      </StyledNavLink>
    </Group>
  );
}

export default function SiteHeader() {
  const theme = useMantineTheme();
  const [backgroundColor, setBackgroundColor] = useState(
    theme.colors.transparent[0],
  );
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

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

        {isMobile ? (
          <MobileMenu
            backgroundColor={backgroundColor}
            navigate={navigate}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        ) : (
          <DesktopMenu backgroundColor={backgroundColor} />
        )}
      </Container>
    </Paper>
  );
}
