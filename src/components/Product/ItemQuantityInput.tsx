import { NumberInput } from '@mantine/core';
import { useCart } from '@context/cart/useCart';
import type { CartItem } from '@stores/cartStoreEntry';

export function ItemQuantityInput({ id, title, quantity, finish }: CartItem) {
  const { setItem } = useCart();

  return (
    <NumberInput
      label="Qty"
      min={0}
      step={1}
      value={quantity}
      onChange={(value) => {
        const q = typeof value === 'number' ? value : parseInt(value);
        setItem({ id, title, quantity: q || 0, finish });
      }}
      hideControls
    />
  );
}
