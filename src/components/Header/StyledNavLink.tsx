import { useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { NavLink, type NavLinkRenderProps } from 'react-router-dom';

export default function StyledNavLink({
  to,
  className,
  headerBackgroundColor,
  children,
}: {
  to: string;
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
  headerBackgroundColor: string;
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getColor = () => {
    if (isHovered) {
      return theme.colors.celesteGold[5];
    }

    return headerBackgroundColor === theme.white ? theme.black : theme.white;
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
