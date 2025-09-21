import { useContext } from 'react';
import { FlagsContext } from './FlagsContext';

export const useFlags = () => {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error('useFlags must be used within FlagsProvider');
  return ctx;
};
