import type { RouteObject } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DisplayTierProducts from './pages/DisplayTierProducts';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />, // ← includes Header/Footer
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'tiers/:tierSlug', element: <DisplayTierProducts /> }, // ← 🔥
    ],
  },
];
