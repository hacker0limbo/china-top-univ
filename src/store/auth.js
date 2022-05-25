const createAuth = (set) => ({
  auth: {
    authed: false,
  },
  authActions: {
    login: () => {
      set((state) => ({
        auth: {
          ...state.auth,
          authed: true,
        },
      }));
    },
    logout: () => {
      set((state) => ({
        auth: {
          ...state.auth,
          authed: false,
        },
      }));
    },
  },
});

export default createAuth;
