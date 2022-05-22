# 中国一流高校搜索程序

该项目为移动端项目, 请在手机上打开浏览器查看

加油鸭

## 记录

每次数据更新之后可能需要检查的几个地方:
- 重新使用本地 cli 跑一遍数据
- 搜索条件对应的 column 位置
- 虚线的 css 选择器

## 待处理问题:

基本问题:
- ~~由于数据长度不一致的原因, 在 pagination 操作后会出现右侧滚动条不在底部的位置, 解决办法是监听 pagination 的 onChange 事件, 记一个 flag, useLayoutEffect 里进行判断是否需要调整将滚动条移至底部, 最后将 flay 复原~~

react-vant 2.0 遇到的问题:
- 打包后 Form 中的 Field 的 flex 出现问题, 已用自定义样式覆盖
- ~~Cell 在不设置 value 仅设置 isLink 后箭头位置出现错误, 目前使用 value="" 做占位符. 比较新的 v2 dev 版已解决, v1 不存在此问题~~
- 由于 github 部署不能有效识别 browserrouter, 路由暂时改为 hashrouter, hashrouter 不支持 state, 导致登录后无法实现跳转回原先想访问的页面, 只能手动设置成登录到主页

react-vant 降级为 v1 后的问题
- Form 是默认被包裹在 Cell 里, 默认会渲染上下两个 border, 当前解决办法是全部不设置 border, 底部增加 Divider 模拟底部的 border
- 同上, Cell.Group 无法设置单方面 border, 例如无法只设置 border-top. 解决方法一样是使用 Divider

antv f2 问题:
- canvas 里的 chart 数据更新后没有重新渲染, 原因不明...
- 手机浏览器测试下字体发虚, 原因不明...