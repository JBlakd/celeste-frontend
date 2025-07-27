import { useState, useEffect } from 'react';
import { type AuthData, authStoreEntry } from '@stores/authStoreEntry';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    authStoreEntry.get().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const login = async (data: AuthData) => {
    await authStoreEntry.set(data);
    setUser(data);
  };

  const logout = async () => {
    await authStoreEntry.clear();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
