import localforage from 'localforage';

localforage.config({
  name: 'celeste-store',
  storeName: 'cart', // IndexedDB object store name
  driver: localforage.INDEXEDDB,
});

export const CART_KEY = 'cart';

export interface CartItem {
  id: string;
  quantity: number;
  title: string;
  finish: 'Polished' | 'Matte';
}

export interface CartData {
  items: Array<CartItem>;
}

export const cartStore = {
  async get() {
    return await localforage.getItem<CartData>(CART_KEY);
  },
  async set(data: CartData) {
    await localforage.setItem(CART_KEY, data);
  },
  async clear() {
    await localforage.removeItem(CART_KEY);
  },
};
