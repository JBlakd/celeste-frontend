import localforage from 'localforage';

localforage.config({
  name: 'celeste-store',
  storeName: 'data', // IndexedDB object store name
  driver: localforage.INDEXEDDB,
});

export const FLAGS_KEY = 'flags';

export interface FlagsData {
  isAnnouncementDismissed: boolean;
}

export const flagsStoreEntry = {
  async get() {
    return await localforage.getItem<FlagsData>(FLAGS_KEY);
  },
  async set(data: FlagsData) {
    await localforage.setItem(FLAGS_KEY, data);
  },
  async clear() {
    await localforage.removeItem(FLAGS_KEY);
  },
};
