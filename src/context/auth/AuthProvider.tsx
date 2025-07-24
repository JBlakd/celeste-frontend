import { useState, useEffect } from 'react';
import { type AuthData, authStore } from '@stores/authStore';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    authStore.get().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const login = async (data: AuthData) => {
    await authStore.set(data);
    setUser(data);
  };

  const logout = async () => {
    await authStore.clear();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
