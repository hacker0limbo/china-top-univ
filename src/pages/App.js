import React from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routesConfig } from '../routes';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  app: {
  },
});

function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routes = useRoutes(routesConfig);

  return (
    <div className={classes.app}>
      {routes}

      <Tabbar
        // placeholder 用于生成等高的占位符
        placeholder
        safeAreaInsetBottom
        fixed
        value={`/${pathname.split('/')[1]}`}
        onChange={(v) => {
          navigate(v);
        }}
      >
        <Tabbar.Item name="/charts" icon="bar-chart-o">
          图表
        </Tabbar.Item>
        <Tabbar.Item name="/reference" icon="guide-o">
          索引
        </Tabbar.Item>
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
    </div>
  );
}

export default App;
