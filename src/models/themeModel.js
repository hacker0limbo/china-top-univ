export const themeModel = {
  name: 'theme',
  state: {
    auto: false,
    darkMode: false,
    systemDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  },
  reducers: {
    setDarkMode: (state, payload) => {
      return {
        ...state,
        darkMode: payload,
      };
    },
    setAuto: (state, payload) => {
      return {
        ...state,
        auto: payload,
      };
    },
    setSystemDarkMode: (state, payload) => {
      return {
        ...state,
        systemDarkMode: payload,
      };
    },
  },
};
