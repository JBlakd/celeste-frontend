import type { RouteObject } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DisplayTierProducts from './pages/DisplayTierProducts';
import ProductDetails from './pages/ProductDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'tier',
        children: [
          {
            path: ':tierSlug',
            children: [
              { index: true, element: <DisplayTierProducts /> },
              { path: ':productSlug', element: <ProductDetails /> },
            ],
          },
        ],
      },
    ],
  },
];
