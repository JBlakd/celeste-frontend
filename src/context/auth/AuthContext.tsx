// src/context/AuthContext.tsx
import { createContext } from 'react';
import type { AuthData } from '../../stores/authStore';

type AuthContextType = {
  user: AuthData | null;
  login: (data: AuthData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
