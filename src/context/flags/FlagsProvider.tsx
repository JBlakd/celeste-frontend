import { useState, useEffect } from 'react';
import { type FlagsData, flagsStoreEntry } from '@stores/flagsStoreEntry';
import { FlagsContext } from './FlagsContext';

export const FlagsProvider = ({ children }: { children: React.ReactNode }) => {
  const [flags, setFlags] = useState<FlagsData | null>(null);

  useEffect(() => {
    flagsStoreEntry.get().then((data) => {
      if (data) setFlags(data);
      else setFlags({ lastDismissedAnnouncement: null });
    });
  }, []);

  const setFlag = (key: string, value: boolean) => {
    setFlags((prev) => {
      if (!prev) return { lastDismissedAnnouncement: null };

      const updatedFlags = { ...prev, [key]: value };
      flagsStoreEntry.set(updatedFlags);
      return updatedFlags;
    });
  };

  return <FlagsContext.Provider value={{ flags, setFlag }}>{children}</FlagsContext.Provider>;
};
