/**
 * 登录验证的 model
 * name 类似 combineReducers 之后访问状态使用的 key
 * store.getState().auth = { authed: false }
 */
export const authModel = {
  name: 'auth',
  state: {
    authed: false,
  },
  reducers: {
    login: (state, payload) => {
      return {
        ...state,
        authed: true,
      };
    },

    logout: (state, payload) => {
      return {
        ...state,
        authed: false,
      };
    },
  },
};
