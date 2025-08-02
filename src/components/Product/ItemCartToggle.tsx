import { useCart } from '@context/cart/useCart';
import { useAuth } from '@context/auth/useAuth';
import { IconShoppingCartPlus, IconCheck } from '@tabler/icons-react';
import { Tooltip, useMantineTheme } from '@mantine/core';

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

  return (
    <Tooltip label={inCart ? 'Remove from cart' : label} withArrow>
      <div
        onClick={toggleItem}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        {inCart ? <IconCheck color={theme.colors.celesteGreen[8]} /> : <IconShoppingCartPlus />}
      </div>
    </Tooltip>
  );
}
