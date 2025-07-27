import { NumberInput } from '@mantine/core';
import { useCart } from '@context/cart/useCart';
import type { CartItem } from '@stores/cartStoreEntry';

export function ItemQuantityInput({ id, title, finish }: Omit<CartItem, 'quantity'>) {
  const { cart, setItem } = useCart();
  const cartItem = cart?.items.find(
    (item) => item.id === id && item.finish === finish && item.title === title,
  );

  return (
    <NumberInput
      label="Qty"
      min={0}
      step={1}
      value={cartItem?.quantity || 0}
      onChange={(value) => {
        const q = typeof value === 'number' ? value : parseInt(value);
        setItem({ id, title, quantity: q || 0, finish });
      }}
    />
  );
}
