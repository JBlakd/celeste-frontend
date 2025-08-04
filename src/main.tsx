import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import { AuthProvider } from '@context/auth/AuthProvider';
import { CartProvider } from '@context/cart/CartProvider.tsx';
import './app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
