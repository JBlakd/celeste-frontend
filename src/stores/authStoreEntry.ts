import localforage from 'localforage';

localforage.config({
  name: 'celeste-store',
  storeName: 'data', // IndexedDB object store name
  driver: localforage.INDEXEDDB,
});

export const AUTH_KEY = 'auth';

export type AuthData = {
  token: string;
  companyName: string;
  email: string;
  contactName: string;
};

export const authStoreEntry = {
  async get() {
    const data = await localforage.getItem<AuthData>(AUTH_KEY);
    console.log('authStore.get', data);
    return data;
  },
  async set(data: AuthData) {
    await localforage.setItem(AUTH_KEY, data);
  },
  async clear() {
    await localforage.removeItem(AUTH_KEY);
  },
};
