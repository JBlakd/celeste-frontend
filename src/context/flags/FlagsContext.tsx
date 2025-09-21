import { createContext } from 'react';
import type { FlagsData } from '@stores/flagsStoreEntry';

type FlagsContextType = {
  flags: FlagsData | null;
  setFlag: (key: string, value: boolean | string) => void;
};

export const FlagsContext = createContext<FlagsContextType | null>(null);
