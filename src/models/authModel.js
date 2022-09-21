/**
 * 登录验证的 model
 * @property {string} name 命名空间, 用于后面集合 model, 类似 combineReducers 后能访问的状态
 * @property {object} state 初始状态
 * @property {object} reducers reducers 集合, 每一个 reducer 的形式为 (state, payload) => newState
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
