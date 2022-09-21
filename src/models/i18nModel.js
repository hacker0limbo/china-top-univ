import { LANGUAGES } from '../constants/store'

// 设置切换界面语言的 model
export const i18nModel = {
  name: 'i18n',
  state: {
    language: LANGUAGES.ZHCN.STATE
  },
  reducers: {
    setLanguage: (state, payload) => {
      return {
        ...state,
        language: payload
      }
    }
  }
}