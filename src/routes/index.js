import React from 'react';
import Auth from '../components/Auth';
import Home from '../components/Home';
import About from '../components/About';
import Settings from '../components/Settings';
import Login from '../components/Login';

export const routesConfig = [
  {
    path: '/',
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  { path: '/about', element: <About /> },
  {
    path: '/settings',
    element: (
      <Auth>
        <Settings />
      </Auth>
    ),
  },
  { path: '/login', element: <Login /> },
];
