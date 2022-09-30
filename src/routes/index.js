import React from 'react';
import Auth from '../components/Auth';
import Home from '../pages/home';
import Settings from '../pages/settings';
import Languages from '../pages/settings/Languages';
import Upload from '../pages/settings/Upload';
import Login from '../pages/login';
import Charts from '../pages/charts';
import About from '../pages/about';
import Feedback from '../pages/about/Feedback';
import UpdateLogs from '../pages/about/UpdateLogs';
import Disclaimer from '../pages/about/Disclaimer';
import Technology from '../pages/about/Technology';
import Reference from '../pages/reference';
import UniversityInfo from '../pages/reference/UniversityInfo';

export const routesConfig = [
  {
    path: '/',
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: '/reference',
    element: (
      <Auth>
        <Reference />
      </Auth>
    ),
  },
  {
    path: '/reference/:id',
    element: (
      <Auth>
        <UniversityInfo />
      </Auth>
    ),
  },
  { path: '/charts', element: <Charts /> },
  { path: '/about', element: <About /> },
  { path: '/about/update-logs', element: <UpdateLogs /> },
  { path: '/about/disclaimer', element: <Disclaimer /> },
  { path: '/about/feedback', element: <Feedback /> },
  { path: '/about/technology', element: <Technology /> },
  {
    path: '/settings',
    element: (
      <Auth>
        <Settings />
      </Auth>
    ),
  },
  {
    path: '/settings/languages',
    element: (
      <Auth>
        <Languages />
      </Auth>
    ),
  },
  {
    path: '/settings/upload',
    element: (
      <Auth>
        <Upload />
      </Auth>
    ),
  },
  { path: '/login', element: <Login /> },
];
