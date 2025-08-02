import { Container, Group, Paper, Image, Burger, Popover, Flex, Text, Stack } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import RangeMenuDesktop from '@components/Header/RangeMenu/RangeMenuDesktop';
import { useState, type RefObject } from 'react';
import { useMantineTheme } from '@mantine/core';
import LogoBrandGoldWhiteTransparentBackground from '@assets/LogoBrandGoldWhiteTransparentBackground.png';
import LogoBrandDoubleColorTransparentBackground from '@assets/LogoBrandDoubleColorTransparentBackground.png';
import StyledNavLink from './StyledNavLink';
import { useMediaQuery } from '@mantine/hooks';
import RangeMenuMobile from '@components/Header/RangeMenu/RangeMenuMobile';
import { useWindowScroll } from '@mantine/hooks';
import SearchProducts from './SearchProducts';
import UserSession from './UserSession';
import { CartDrawer } from './CartDrawer';

function MobileMenu({
  shouldHeaderBeColoured,
  navigate,
}: {
  shouldHeaderBeColoured: boolean;
  navigate: (path: string) => void;
}) {
  const theme = useMantineTheme();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Flex gap="lg" align="center">
      <SearchProducts />
      <Popover
        opened={menuOpened}
        onChange={setMenuOpened}
        width={200}
        position="bottom-end"
        offset={20}
        trapFocus={false}
        withRoles={false}
        withinPortal
        keepMounted
      >
        <Popover.Target>
          <Burger
            opened={menuOpened}
            onClick={() => setMenuOpened(!menuOpened)}
            aria-label="Toggle navigation"
            color={shouldHeaderBeColoured ? theme.black : theme.colors.coolWhite[0]}
          />
        </Popover.Target>

        <Popover.Dropdown>
          <Stack>
            <Text
              onClick={() => {
                navigate('/');
                setMenuOpened(false);
              }}
            >
              Home
            </Text>
            <Text
              onClick={() => {
                navigate('/all');
                setMenuOpened(false);
              }}
            >
              All Products
            </Text>
            <RangeMenuMobile shouldHeaderBeColoured={shouldHeaderBeColoured} />
            <Text
              onClick={() => {
                navigate('/about');
                setMenuOpened(false);
              }}
            >
              About
            </Text>
            <Text
              onClick={() => {
                navigate('/contact');
                setMenuOpened(false);
              }}
            >
              Contact
            </Text>
            <UserSession onClick={() => setMenuOpened(false)} />
            <CartDrawer
              onClick={() => setMenuOpened(false)}
              shouldHeaderBeColoured={shouldHeaderBeColoured}
            />
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Flex>
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
      <StyledNavLink
        to="/all"
        className={classes.navLink}
        shouldHeaderBeColoured={shouldHeaderBeColoured}
      >
        All Products
      </StyledNavLink>
      <RangeMenuDesktop shouldHeaderBeColoured={shouldHeaderBeColoured} />
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
      <SearchProducts />
      <UserSession />
      <CartDrawer shouldHeaderBeColoured={shouldHeaderBeColoured} />
    </Group>
  );
}

export default function Header({ headerRef }: { headerRef: RefObject<HTMLDivElement | null> }) {
  const theme = useMantineTheme();
  const [{ y: yScrollPosition }] = useWindowScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [mouseEnteredHeader, setMouseEnteredHeader] = useState(false);

  const scrolledEnough = yScrollPosition > window.innerHeight * 0.9;
  const shouldHeaderBeColoured = scrolledEnough || mouseEnteredHeader || location.pathname !== '/';

  return (
    <Paper
      ref={headerRef}
      className={classes.header}
      style={{
        backgroundColor: shouldHeaderBeColoured
          ? theme.colors.coolWhite[0]
          : theme.colors.transparent[0],
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
                : LogoBrandGoldWhiteTransparentBackground
            }
            style={{ height: '3rem', width: 'auto' }}
            onClick={() => {
              navigate('/');
            }}
          />
        </Paper>

        {isMobile ? (
          <MobileMenu shouldHeaderBeColoured={shouldHeaderBeColoured} navigate={navigate} />
        ) : (
          <DesktopMenu shouldHeaderBeColoured={shouldHeaderBeColoured} />
        )}
      </Container>
    </Paper>
  );
}
