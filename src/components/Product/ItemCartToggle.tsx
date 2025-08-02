import { useCart } from '@context/cart/useCart';
import { useAuth } from '@context/auth/useAuth';
import { IconShoppingCartPlus, IconCheck } from '@tabler/icons-react';
import { Tooltip, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function ItemCartToggle({
  id,
  title,
  finish,
  label = 'Add to cart',
}: {
  id: string;
  title: string;
  finish: 'Polished' | 'Matte';
  label?: string;
}) {
  const { user } = useAuth();
  const { cart, setItem } = useCart();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const cartItem = cart?.items.find(
    (item) => item.id === id && item.title === title && item.finish === finish,
  );

  const inCart = !!cartItem?.quantity;

  const toggleItem = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent Spotlight or outer click triggers
    const nextState = !inCart;
    setItem({
      id,
      title,
      finish,
      quantity: nextState ? 1 : 0,
    });
  };

  if (!user) return null;

  const subtleHoverColor = theme.colors.celesteGold[0]; // pale hover color

  return (
    <Tooltip label={inCart ? 'Remove from cart' : label} withArrow position="right" zIndex={9999}>
      <div
        onClick={toggleItem}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radius.sm,
          cursor: 'pointer',
          transition: 'background-color 120ms ease',
          padding: '0.25rem',
        }}
        onMouseEnter={(e) => {
          if (isMobile) return;
          (e.currentTarget as HTMLDivElement).style.backgroundColor = subtleHoverColor;
        }}
        onMouseLeave={(e) => {
          if (isMobile) return;
          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
        }}
      >
        {inCart ? <IconCheck color={theme.colors.celesteGreen?.[8]} /> : <IconShoppingCartPlus />}
      </div>
    </Tooltip>
  );
}
