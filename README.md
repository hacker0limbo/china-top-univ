# 中国一流高校搜索程序

该项目为移动端项目, 请在手机上打开浏览器查看

加油鸭

## 记录

每次数据更新之后可能需要检查的几个地方:
- 重新使用本地 cli 跑一遍数据
- 搜索条件对应的 column 位置
- 虚线的 css 选择器

## 待处理问题:

- 打包后 Form 中的 Field 的 flex 出现问题, 已用自定义样式覆盖
- Cell 在不设置 value 仅设置 isLink 后箭头位置出现错误, 目前使用 value="" 做占位符
- 由于 github 部署不能有效识别 browserrouter, 路由暂时改为 hashrouter, hashrouter 不支持 state, 导致登录后无法实现跳转回原先想访问的页面, 只能手动设置成登录到主页