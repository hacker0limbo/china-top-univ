import React, { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { routesConfig } from '../routes';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles({
  app: {
  },
});

function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const darkMode = useSelector(state => state.theme.darkMode)
  const { pathname } = useLocation();
  const routes = useRoutes(routesConfig);

  // 设置主题, 每次 app 运行时候根据主题设置 html 属性
  useEffect(() => {
    const html = document.querySelector('html')
    if (darkMode) {
      html.setAttribute('theme', 'dark-mode')
    } else {
      html.removeAttribute('theme')
    }
  }, [darkMode])

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
