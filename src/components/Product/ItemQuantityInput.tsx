import { NumberInput } from '@mantine/core';
import { useCart } from '@context/cart/useCart';
import type { CartItem } from '@stores/cartStoreEntry';
import { useEffect, useState } from 'react';
import { useAuth } from '@context/auth/useAuth';

export function ItemQuantityInput({
  id,
  title,
  finish,
  label = 'none',
}: Omit<CartItem, 'quantity'> & { label?: 'none' | 'condensed' | 'full' }) {
  const { user } = useAuth();
  const { cart, setItem } = useCart();
  const cartItem = cart?.items.find(
    (item) => item.id === id && item.finish === finish && item.title === title,
  );

  const [value, setValue] = useState<string | number>(cartItem?.quantity || 0);

  // Update local value when cart changes externally
  useEffect(() => {
    setValue(cartItem?.quantity || 0);
  }, [cartItem?.quantity]);

  const handleBlur = () => {
    const q = typeof value === 'number' ? value : parseInt(value.toString(), 10);
    setItem({ id, title, quantity: isNaN(q) ? 0 : q, finish });
  };

  const getLabel = () => {
    if (label === 'full') return `Quantity in Cart - ${finish}`;
    if (label === 'condensed') return `${finish}`;
    return undefined;
  };

  if (!user) {
    return null;
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <NumberInput
        label={getLabel()}
        min={0}
        step={1}
        value={value}
        onChange={setValue}
        onBlur={handleBlur}
        size="xs"
        w={label === 'full' ? undefined : '5rem'}
        allowDecimal={false}
      />
    </div>
  );
}
