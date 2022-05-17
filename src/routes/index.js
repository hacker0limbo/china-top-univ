import React from 'react';
import Auth from '../components/Auth';
import Home from '../components/Home';
import About from '../components/About';
import Settings from '../components/Settings';
import { HomeO, InfoO, SettingO } from '@react-vant/icons';

export const routesConfig = [
  {
    title: '主页',
    path: '/',
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    icon: <HomeO />,
  },
  { title: '关于', path: '/about', element: <About />, icon: <InfoO /> },
  { title: '设置', path: '/settings', element: <Settings />, icon: <SettingO /> },
];
