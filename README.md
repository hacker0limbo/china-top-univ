# 中国一流高校搜索程序

该项目为移动端项目, 请在手机上打开浏览器查看

加油鸭

## 数据更新

每次 xlsx 数据更新后需重新用 cli 跑一下数据得到最新的 json, 数据变动时需检查这几个地方:
- 主页搜索条件的索引位置
- 主页表格展示的虚线 css 选择器索引位置
- column 名字是否改变


## 待处理问题:

基本问题:
- ~~由于数据长度不一致的原因, 在 pagination 操作后会出现右侧滚动条不在底部的位置, 解决办法是监听 pagination 的 onChange 事件, 记一个 flag, useLayoutEffect 里进行判断是否需要调整将滚动条移至底部, 最后将 flay 复原~~
- ios 上浏览器在 focus 一个 input 元素会默认进行 zoom, 还没办法取消...解决办法是强行让整个 html 不进行缩放: https://stackoverflow.com/a/46254706/12733140

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

## 记录

zustand 是该项目的项目管理库. 由于这个项目需要全局状态, redux 太重, 别的小的库 github star 星星也不多, 而且也不是 flux 的, 我自己不喜欢 mobox 这种响应式, 反而 redux 这种偏函数式和中心化数据流用的习惯, 但 redux 真的太重了.

zustand 用下来有几点感受:
- state 和 action 是放在一起的, 好处是直接写一块, 坏处是全部都在 store 里, 该怎么组织...
- 官方提到是 unopinionated, 好处是想怎么写就怎么写, 但官方也不给 best practice, redux 至少还出了一个 redux toolkit, 或者你去用 rematch 等衍生库. zustand 你想找一下 best practice 几乎没有
- redux 可以用 combineReducers 把不同的状态集合起来, 而且每个 reducer 是会被以对象值形式保存起来, 去查看整个 store 的时候就很清晰, 有哪些状态, 子状态. 但是 zustand 要分开不同的 state 还要自己在 create 里声明, 在合并的时候本身不做任何的状态空间命名. 同时由于 action 也是被放在 store 里的, 会显的有点奇怪...
- 确实不用写模板代码, 中间件, persist state, immutable 甚至搭配 immer 都做的很好.

## TODO

- ~~增加多维搜索(需重写, UI 增加悬浮球)~~
  - 悬浮球等 v2 发布加上
  - ~~多维搜索暂时没做表单项目之间联动, 例如当搜索项是 985, 211 这种二元的, 应展示单选框而非输入框~~ (已完成)
- ~~antv f2 支持横屏展示~~ (没意义, 不做了)
- ~~支持文件上传和验证~~ (没意义, 不做了)