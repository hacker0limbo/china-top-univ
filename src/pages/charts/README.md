# 图表页面

自定义一些效果的时候, 尽量多使用 echartsInstance.dispatchAction 而不是说用 react 状态改变 option, 因为状态改变会导致 echarts 多次渲染, 造成不可控的问题
