import React from 'react';
import { useSelector } from 'react-redux';

/**
 * 根据当前系统主题以及用户设置主题返回当前应该使用的主题
 * 如果用户选择主题跟随系统, 返回当前主题
 * @returns {Boolean}
 */
export function useIsDarkTheme() {
  const isDarkTheme = useSelector((state) =>
    state.theme.auto ? state.theme.systemDarkMode : state.theme.darkMode
  );

  return isDarkTheme;
}
