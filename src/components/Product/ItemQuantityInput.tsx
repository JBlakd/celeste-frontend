import { NumberInput } from '@mantine/core';
import { useCart } from '@context/cart/useCart';
import type { CartItem } from '@stores/cartStoreEntry';

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

  return (
    <NumberInput
      label={withLabel ? `Quantity in Cart - ${finish}` : undefined}
      min={0}
      step={1}
      defaultValue={cartItem?.quantity || 0}
      onBlur={(e) => {
        const q = parseInt(e.currentTarget.value || '0', 10);
        setItem({ id, title, quantity: isNaN(q) ? 0 : q, finish });
      }}
      size="xs"
      w={withLabel ? undefined : '5rem'}
      allowDecimal={false}
    />
  );
}
