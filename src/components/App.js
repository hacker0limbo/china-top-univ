import React, { useState } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routesConfig } from '../routes';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState(pathname);
  const routes = useRoutes(routesConfig.map(({ path, element }) => ({ path, element })));

  return (
    <div className="app">
      <Tabbar
        safeAreaInsetBottom
        fixed
        value={currentPath}
        onChange={(v) => {
          setCurrentPath(v);
          navigate(v);
        }}
      >
        {routesConfig.map(({ path, title, icon }) => (
          <Tabbar.Item key={title} name={path} icon={icon}>
            {title}
          </Tabbar.Item>
        ))}
      </Tabbar>

      {routes}
    </div>
  );
}

export default App;
