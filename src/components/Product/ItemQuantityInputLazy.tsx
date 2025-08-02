import { useCart } from '@context/cart/useCart';
import { useAuth } from '@context/auth/useAuth';
import { useEffect, useState } from 'react';
import { NumberInput, Tooltip, Text, useMantineTheme } from '@mantine/core';
import { IconShoppingCartPlus } from '@tabler/icons-react';

export function ItemQuantityInputLazy({
  id,
  title,
  finish,
  label = 'condensed',
  hideControls = false,
}: {
  id: string;
  title: string;
  finish: 'Polished' | 'Matte';
  label?: 'none' | 'condensed' | 'full';
  hideControls?: boolean;
}) {
  const { user } = useAuth();
  const { cart, setItem } = useCart();
  const theme = useMantineTheme();

  const cartItem = cart?.items.find(
    (item) => item.id === id && item.title === title && item.finish === finish,
  );

  const [value, setValue] = useState<string | number>(cartItem?.quantity || 0);
  const [hovered, setHovered] = useState(false);
  const [activated, setActivated] = useState(cartItem?.quantity && cartItem.quantity > 0);

  useEffect(() => {
    setValue(cartItem?.quantity || 0);
    setActivated(cartItem?.quantity && cartItem.quantity > 0);
  }, [cartItem?.quantity]);

  const handleBlur = () => {
    const q = typeof value === 'number' ? value : parseInt(value.toString(), 10);
    const qty = isNaN(q) ? 0 : q;

    setItem({ id, title, finish, quantity: qty });

    if (qty === 0) {
      setActivated(false);
    }
  };

  const activate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivated(true);
    if (!value) {
      setValue(1);
      setItem({ id, title, finish, quantity: 1 });
    }
  };

  const getLabel = () => {
    if (label === 'full') return `Quantity in Cart - ${finish}`;
    if (label === 'condensed') return `${finish}`;
    return undefined;
  };

  if (!user) return null;

  const labelText = getLabel();
  const iconColor = hovered
    ? theme.colors.celesteGold?.[5] || theme.colors.yellow[5]
    : theme.colors.gray[5];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        width: 'fit-content',
      }}
    >
      {labelText && (
        <Text size="xs" style={{ marginBottom: 0 }}>
          {labelText}
        </Text>
      )}

      {activated ? (
        <NumberInput
          value={value}
          onChange={setValue}
          onBlur={handleBlur}
          min={0}
          step={1}
          size="xs"
          w="5rem"
          hideControls={hideControls}
          allowDecimal={false}
        />
      ) : (
        <Tooltip label="Add to cart" withArrow position="bottom">
          <div
            onClick={(event) => {
              activate(event);
              setHovered(false);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            <IconShoppingCartPlus color={iconColor} />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
