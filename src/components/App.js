import React from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routesConfig } from '../routes';

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
        <Tabbar.Item name="/" icon="home-o">
          主页
        </Tabbar.Item>
        <Tabbar.Item name="/about" icon="info-o">
          关于
        </Tabbar.Item>
        <Tabbar.Item name="/settings" icon="setting-o">
          设置
        </Tabbar.Item>
      </Tabbar>
      {routes}
    </div>
  );
}

export default App;
