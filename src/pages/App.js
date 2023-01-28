import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { themeVars } from '../theme';

const useStyles = createUseStyles({
  app: {},
});

function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const autoTheme = useSelector((state) => state.theme.auto);
  const { pathname } = useLocation();
  const [systemDarkMode, setSystemDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = useCallback((isDark) => {
    if (isDark) {
      Object.entries(themeVars.dark).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v);
      });
    } else {
      Object.entries(themeVars.light).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v);
      });
    }
  }, []);

  useEffect(() => {
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      setSystemDarkMode(event.matches);
    });
  }, []);

  // 初始化时设置主题
  useEffect(() => {
    // auto 为 true 时根据系统主题, 为 false 时根据用户定义的主题
    if (autoTheme) {
      toggleTheme(systemDarkMode);
    } else {
      toggleTheme(darkMode);
    }
  }, [autoTheme, darkMode, systemDarkMode, toggleTheme]);

  // react router 不再进行外部的 hash change, 例如, 手动更改 url
  // 解决方法为手动去监听, 调用 react router 自己的 navigate 方法
  // https://github.com/remix-run/react-router/issues/9940#issuecomment-1397534720
  useEffect(() => {
    const handleHashChange = () => {
      const [, path] = window.location.hash.split('#/');
      navigate(path, { replace: true });
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [navigate]);

  return (
    <div className={classes.app}>
      <Outlet />

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
