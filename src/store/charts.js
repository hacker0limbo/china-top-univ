import { CHARTS } from '../constants/store';

function setBarChartLayout(set, chartName, layoutValue) {
  set((state) => ({
    charts: {
      ...state.charts,
      [chartName]: {
        ...state.charts[chartName],
        bar: {
          ...state.charts[chartName].bar,
          layout: layoutValue,
        },
      },
    },
  }));
}

/**
 * 定义 chart 页面的数据
 * 目前 chart 页面三种类型图, 985, 211, 双一流
 * 其中柱状图可定义排序方式, layout 字段可选: ascending, descending, default
 * 对应 settings 页面 action 里的 升序, 降序, 默认
 */
const createCharts = (set, get) => ({
  charts: {
    location985: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
    location211: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
    locationDoubleTops: { bar: { layout: CHARTS.LAYOUT.DEFAULT.STATE } },
  },
  chartsActions: {
    setLocation985BarChartLayout: (layoutValue) => {
      setBarChartLayout(set, 'location985', layoutValue);
    },
    setLocation211BarChartLayout: (layoutValue) => {
      setBarChartLayout(set, 'location211', layoutValue);
    },
    setLocationDoubleTopsBarChartLayout: (layoutValue) => {
      setBarChartLayout(set, 'locationDoubleTops', layoutValue);
    },
  },
});

export default createCharts;
