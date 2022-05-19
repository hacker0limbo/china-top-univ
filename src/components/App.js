import React from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routesConfig } from '../routes';
import { HomeO, InfoO, SettingO } from '@react-vant/icons';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routes = useRoutes(routesConfig);

  return (
    <div className="app">
      <Tabbar
        safeAreaInsetBottom
        fixed
        value={pathname}
        onChange={(v) => {
          navigate(v);
        }}
      >
        <Tabbar.Item name="/" icon={<HomeO />}>
          主页
        </Tabbar.Item>
        <Tabbar.Item name="/about" icon={<InfoO />}>
          关于
        </Tabbar.Item>
        <Tabbar.Item name="/settings" icon={<SettingO />}>
          设置
        </Tabbar.Item>
      </Tabbar>
      {routes}
    </div>
  );
}

export default App;
