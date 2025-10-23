import type { RouteObject } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from '@pages/Home';
import About from '@pages/About';
import Contact from '@pages/Contact';
import DisplayRangeProducts from '@pages/DisplayRangeProducts';
import ProductDetails from '@pages/ProductDetails';
import DisplayAllProducts from '@pages/DisplayAllProducts';
import Resources from '@pages/Resources';
import Delivery from '@pages/Delivery';
import FindADisplay from '@pages/FindADisplay';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'all', element: <DisplayAllProducts /> },
      { path: 'contact', element: <Contact /> },
      { path: 'delivery', element: <Delivery /> },
      { path: 'findADisplay', element: <FindADisplay /> },
      { path: ':productSlug', element: <ProductDetails /> },
      {
        path: 'range',
        children: [
          {
            path: ':rangeSlug',
            children: [{ index: true, element: <DisplayRangeProducts /> }],
          },
        ],
      },
      { path: 'resources', element: <Resources /> },
    ],
  },
];
