export const themeModel = {
  name: 'theme',
  state: {
    darkMode: false,
  },
  reducers: {
    setDarkMode: (state, payload) => {
      return {
        ...state,
        darkMode: payload
      }
    }
  }
}