/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Group, Paper, Image, Burger, Menu } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import TierMenuDesktop from '@components/Header/TierMenuDesktop';
import { useEffect, useState, type RefObject } from 'react';
import { useMantineTheme } from '@mantine/core';
import LogoBrandWhiteTransparentBackground from '@assets/LogoBrandWhiteTransparentBackground.png';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';
import StyledNavLink from './StyledNavLink';
import { useMediaQuery } from '@mantine/hooks';
import TierMenuMobile from '@components/Header/TierMenuMobile';
import { useWindowScroll } from '@mantine/hooks';

function MobileMenu({
  shouldHeaderBeColoured,
  navigate,
  menuOpened,
  setMenuOpened,
}: {
  shouldHeaderBeColoured: boolean;
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
      offset={20}
    >
      <Menu.Target>
        <Burger
          opened={menuOpened}
          onClick={() => setMenuOpened(!menuOpened)}
          aria-label="Toggle navigation"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate('/')}>Home</Menu.Item>
        <Menu.Item>
          <TierMenuMobile shouldHeaderBeColoured={shouldHeaderBeColoured} />
        </Menu.Item>
        <Menu.Item onClick={() => navigate('/about')}>About</Menu.Item>
        <Menu.Item onClick={() => navigate('/contact')}>Contact</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function DesktopMenu({ shouldHeaderBeColoured }: { shouldHeaderBeColoured: boolean }) {
  return (
    <Group className={classes.navGroup}>
      <StyledNavLink
        to="/"
        className={classes.navLink}
        shouldHeaderBeColoured={shouldHeaderBeColoured}
      >
        Home
      </StyledNavLink>
      <TierMenuDesktop shouldHeaderBeColoured={shouldHeaderBeColoured} />
      <StyledNavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? `${classes.navLink} ${classes.navLinkActive}` : classes.navLink
        }
        shouldHeaderBeColoured={shouldHeaderBeColoured}
      >
        About
      </StyledNavLink>
      <StyledNavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? `${classes.navLink} ${classes.navLinkActive}` : classes.navLink
        }
        shouldHeaderBeColoured={shouldHeaderBeColoured}
      >
        Contact
      </StyledNavLink>
    </Group>
  );
}

export default function SiteHeader({ headerRef }: { headerRef: RefObject<HTMLDivElement | null> }) {
  const theme = useMantineTheme();
  const [{ y: yScrollPosition }] = useWindowScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [menuOpened, setMenuOpened] = useState(false);
  const [mouseEnteredHeader, setMouseEnteredHeader] = useState(false);

  const scrolledEnough = yScrollPosition > window.innerHeight * 0.9;
  const shouldHeaderBeColoured = scrolledEnough || mouseEnteredHeader || location.pathname !== '/';

  return (
    <Paper
      ref={headerRef}
      className={classes.header}
      style={{
        backgroundColor: shouldHeaderBeColoured ? theme.white : theme.colors.transparent[0],
      }}
      onMouseEnter={() => {
        if (location.pathname !== '/') {
          return;
        }

        setMouseEnteredHeader(true);
      }}
      onMouseLeave={() => {
        if (location.pathname !== '/') {
          return;
        }

        setMouseEnteredHeader(false);
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
              shouldHeaderBeColoured
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
            shouldHeaderBeColoured={shouldHeaderBeColoured}
            navigate={navigate}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        ) : (
          <DesktopMenu shouldHeaderBeColoured={shouldHeaderBeColoured} />
        )}
      </Container>
    </Paper>
  );
}
