import { NumberInput } from '@mantine/core';
import { useCart } from '@context/cart/useCart';
import type { CartItem } from '@stores/cartStoreEntry';
import { useEffect, useState } from 'react';

export function ItemQuantityInput({
  id,
  title,
  finish,
  withLabel,
}: Omit<CartItem, 'quantity'> & { withLabel?: boolean }) {
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

  return (
    <NumberInput
      label={withLabel ? `Quantity in Cart - ${finish}` : undefined}
      min={0}
      step={1}
      value={value}
      onChange={setValue}
      onBlur={handleBlur}
      size="xs"
      w={withLabel ? undefined : '5rem'}
      allowDecimal={false}
    />
  );
}
