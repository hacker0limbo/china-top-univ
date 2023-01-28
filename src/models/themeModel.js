export const themeModel = {
  name: 'theme',
  state: {
    auto: false,
    darkMode: false,
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
  },
};
