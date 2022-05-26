import React from 'react';
import Auth from '../components/Auth';
import Home from '../components/Home';
import About from '../components/About';
import Settings from '../components/Settings';
import Login from '../components/Login';
import UniversityTableCharts from '../components/UniversityTableCharts';
import UpdateLogs from '../components/UpdateLogs';
import Disclaimer from '../components/Disclaimer';

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
  { path: '/about/update-logs', element: <UpdateLogs /> },
  { path: '/about/disclaimer', element: <Disclaimer /> },
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
