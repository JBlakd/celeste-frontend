import { useState, useEffect, useMemo } from 'react';
import { type CartData, type CartItem, cartStore } from '@stores/cartStore';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);

  useEffect(() => {
    cartStore.get().then((data) => {
      if (data) setCart(data);
      else setCart({ items: [] });
    });
  }, []);

  const setItem = ({ id, title, quantity, finish }: CartItem) => {
    setCart((prev) => {
      if (!prev) return { items: [] };

      const updatedItems = [...prev.items];
      const existingIndex = updatedItems.findIndex((item) => item.id === id);

      if (quantity <= 0) {
        if (existingIndex !== -1) updatedItems.splice(existingIndex, 1);
      } else if (existingIndex !== -1) {
        updatedItems[existingIndex].quantity = quantity;
      } else {
        updatedItems.push({ id, title, quantity, finish });
      }

      const updatedCart = { items: updatedItems };
      cartStore.set(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({ items: [] });
    cartStore.clear();
  };

  const totalQuantity = useMemo(() => {
    return cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, totalQuantity, setItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
