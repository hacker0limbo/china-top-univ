import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, Outlet, matchPath } from 'react-router-dom';
import { Tabbar } from 'react-vant';
import { createUseStyles } from 'react-jss';
import { themeVars } from '../theme';
import { useIsDarkTheme } from '../hooks/useIsDarkTheme';
import { useDispatch } from 'react-redux';
import { LocalStorageService } from '../services';

const useStyles = createUseStyles({
  app: {},
});

function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isChartPath = matchPath('/charts/*', pathname);
  const isDarkTheme = useIsDarkTheme();
  const [showTabbar, setShowTabbar] = useState(
    window.matchMedia('(orientation: portrait)').matches
  );

  const handleOrientation = useCallback(
    (e) => {
      if (e.matches) {
        // Portrait mode, 非横屏模式
        setShowTabbar(true);
      } else {
        // Landscape, 横屏模式
        if (isChartPath) {
          setShowTabbar(false);
        }
      }
    },
    [isChartPath]
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

  const handleColorSchemeChange = useCallback(
    (event) => {
      dispatch.theme.setSystemDarkMode(event.matches);
    },
    [dispatch]
  );

  useEffect(() => {
    // 监听系统主题变化
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorSchemeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

  // 初始化时设置主题
  useEffect(() => {
    toggleTheme(isDarkTheme);
  }, [isDarkTheme, toggleTheme]);

  // 当横屏时不显示 tabbar, 因为可能挡住图表渲染
  useEffect(() => {
    const portrait = window.matchMedia('(orientation: portrait)');

    portrait.addEventListener('change', handleOrientation);

    return () => {
      portrait.removeEventListener('change', handleOrientation);
    };
  }, [handleOrientation]);

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

  // 监听是否存在 auth token, 存在设置登录状态
  useEffect(() => {
    if (LocalStorageService.getPersistAuth()) {
      dispatch.auth.login();
    }
  }, [dispatch.auth]);

  return (
    <div className={classes.app}>
      <Outlet />

      {showTabbar ? (
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
      ) : null}
    </div>
  );
}

export default App;
