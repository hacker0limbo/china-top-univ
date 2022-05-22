import React from 'react';
import Auth from '../components/Auth';
import Home from '../components/Home';
import About from '../components/About';
import Settings from '../components/Settings';
import Login from '../components/Login';
import UniversityTableCharts from '../components/UniversityTableCharts'

export const routesConfig = [
  {
    path: '/',
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  { path: '/charts', element: <UniversityTableCharts /> },
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
