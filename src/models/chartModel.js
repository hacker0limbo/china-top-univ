import { CHARTS } from '../constants/store';

const setBarChartLayout = (chartName) => (state, payload) => {
  return {
    ...state,
    [chartName]: {
      ...state[chartName],
      bar: {
        ...state[chartName].bar,
        layout: payload,
      },
    },
  };
};

/**
 * 图标的 model
 */
export const chartModel = {
  name: 'charts',
  state: {
    location985: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
    location211: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
    locationDoubleTops: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
  },
  reducers: {
    setLocation985BarChartLayout: (state, payload) => {
      return setBarChartLayout('location985')(state, payload);
    },
    setLocation211BarChartLayout: (state, payload) => {
      return setBarChartLayout('location211')(state, payload);
    },
    setLocationDoubleTopsBarChartLayout: (state, payload) => {
      return setBarChartLayout('locationDoubleTops')(state, payload);
    },
  },
};
