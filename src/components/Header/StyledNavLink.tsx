import { useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { NavLink, type NavLinkRenderProps } from 'react-router-dom';

export default function StyledNavLink({
  to,
  className,
  shouldHeaderBeColoured,
  children,
}: {
  to: string;
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
  shouldHeaderBeColoured: boolean;
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getColor = () => {
    if (isHovered) {
      return theme.colors.celesteGold[5];
    }

    return shouldHeaderBeColoured ? theme.black : theme.colors.coolWhite[0];
  };

  return (
    <NavLink
      to={to}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: getColor(),
      }}
    >
      {children}
    </NavLink>
  );
}
