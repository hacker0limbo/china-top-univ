import Color from 'color';

/**
 * 主题变量
 */
export const themeVars = {
  light: {
    'background-color': '#f7f7f7',
    color: '#323232',
    '--rv-brand-color': '#3f45ff',
    '--rv-black': '#000',
    '--rv-white': '#fff',
    '--rv-gray-1': '#f7f8fa',
    '--rv-gray-2': '#f2f3f5',
    '--rv-gray-3': '#ebedf0',
    '--rv-gray-4': '#dcdee0',
    '--rv-gray-5': '#c8c9cc',
    '--rv-gray-6': '#969799',
    '--rv-gray-7': '#646566',
    '--rv-gray-8': '#323232',
    '--rv-red': '#f44336',
    '--rv-blue': '#3f45ff',
    '--rv-orange': '#ff976a',
    '--rv-orange-dark': '#ff590d',
    '--rv-orange-light': '#fffbe8',
    '--rv-green': '#00c853',
    // Gradient Colors
    '--rv-gradient-red': 'linear-gradient(to right, #ff6034, #ee0a24)',
    '--rv-gradient-orange': 'linear-gradient(to right, #ffd01e, #ff8917)',
    // 暗黑模式重写样式在下, 亮色模式保持不变
    // switch
    '--rv-switch-node-background-color': 'var(--rv-white)',
    // button
    '--rv-button-default-color': 'var(--rv-text-color)',
    '--rv-button-default-border-color': 'var(--rv-border-color)',
    '--rv-button-primary-color': 'var(--rv-white)',
    '--rv-button-success-color': 'var(--rv-white)',
    '--rv-button-danger-color': 'var(--rv-white)',
    '--rv-button-warning-color': 'var(--rv-white)',
    // toast
    '--rv-toast-text-color': 'var(--rv-white)',
    '--rv-toast-loading-icon-color': 'var(--rv-white)',
    // picker
    '--rv-picker-mask-background-image':
      'linear-gradient(180deg, hsla(0, 0%, 100%, .9), hsla(0, 0%, 100%, .4)), linear-gradient(0deg, hsla(0, 0%, 100%, .9), hsla(0, 0%, 100%, .4))',
  },
  dark: {
    'background-color': Color('#f7f7f7').darken(1),
    color: Color('#323232').whiten(25).hex(),
    '--rv-brand-color': Color('#3f45ff').blacken(0.5).hex(),
    '--rv-black': '#fff',
    '--rv-white': '#1c1c1e',
    '--rv-gray-1': '#37363b',
    '--rv-gray-2': '#3A393E',
    '--rv-gray-3': '#3a3a3c',
    '--rv-gray-4': Color('#dcdee0').darken(0.5).hex(),
    '--rv-gray-5': Color('#c8c9cc').lightness(40).hex(),
    '--rv-gray-6': Color('#969799').lightness(50).hex(),
    '--rv-gray-7': Color('#646566').lightness(75).hex(),
    '--rv-gray-8': Color('#323232').lightness(90).hex(),
    '--rv-red': Color('#f44336').blacken(0.5).hex(),
    '--rv-blue': Color('#3f45ff').blacken(0.5).hex(),
    '--rv-orange': Color('#ff976a').blacken(0.5).hex(),
    '--rv-orange-dark': '#e8b339',
    '--rv-orange-light': '#2b2111',
    '--rv-green': Color('#00c853').blacken(0.5).hex(),
    // Gradient Colors
    '--rv-gradient-red': 'linear-gradient(to right, #ff6034, #ee0a24)',
    '--rv-gradient-orange': 'linear-gradient(to right, #ffd01e, #ff8917)',
    // 暗黑模式下需要重写的组件样式
    // switch
    '--rv-switch-node-background-color': 'var(--rv-black)',
    // button
    '--rv-button-default-color': 'var(--rv-black)',
    '--rv-button-default-border-color': 'var(--rv-black)',
    '--rv-button-primary-color': 'var(--rv-black)',
    '--rv-button-success-color': 'var(--rv-black)',
    '--rv-button-danger-color': 'var(--rv-black)',
    '--rv-button-warning-color': 'var(--rv-black)',
    // toast
    '--rv-toast-text-color': 'var(--rv-black)',
    '--rv-toast-loading-icon-color': 'var(--rv-black)',
    // picker
    '--rv-picker-mask-background-image':
      'linear-gradient(180deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .1)), linear-gradient(0deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .1))',
  },
};
