import { createContext } from 'react';
import type { CartData, CartItem } from '../../stores/cartStoreEntry';

type CartContextType = {
  cart: CartData | null;
  totalQuantity: number;
  setItem: (item: CartItem) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
