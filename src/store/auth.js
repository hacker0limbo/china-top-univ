const createAuth = (set) => ({
  authed: false,
  login: () => set((state) => ({ authed: true })),
  logout: () => set((state) => ({ authed: false })),
});

export default createAuth;
