# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2023.2

### Added

- 增加 Dockerfile 和 docker-compose 文件

## 2023.1

### Added

- 增加暗黑主题
  - 可根据系统主题适配
- 增加 prettier 配置
- 增加 CHANGELOG.md 和 TODO.md
- 增加 404 页面
- 增加登录后页面跳转回到之前的路由

### Changed

- `index.css` 全局样式移入主题变量中
- React Router 升级到最新
- 数据转换有 [`xlsx`](https://github.com/SheetJS/sheetjs) 转为使用 [`csv-parse`](https://github.com/adaltas/node-csv/tree/master/packages/csv-parse/)

### Fixed

- 部分写死的亮色主题颜色改为使用 css 变量适配主题

### Removed

- 取消显示分割线
- 数据更新: 2017 双一流数据及其相关显示均删除

## 2022

### Added

- 索引页面
- emailsjs 以邮件形式进行反馈信息的收集
- 登录时可进行秘钥的保存, 下次免登录
- 路由级别的权限
- 主页表格的基本搜索以及高级搜索

### Changed

- 由于 github page 的[问题](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing), browserRouter 改为 hashRouter
- `react-super-responsive-table` 废弃, 改为使用 react-vant 原生的 Cell 进行表格渲染
- css 单文件写所有页面的样式废弃, 改为 JSS 进行组件粒度的样式管理
- 状态管理库由 `Zustand` 改为 `Rematch`

### Fixed

- 由于数据长度不一致的原因, 在 pagination 操作后会出现右侧滚动条不在底部的位置, 解决办法是监听 pagination 的 onChange 事件, 记一个 flag, useLayoutEffect 里进行判断是否需要调整将滚动条移至底部, 最后将 flag 复原
- ios 上浏览器在 focus 一个 input 元素会默认进行 zoom, 解决办法是强行让整个 html 不进行缩放: https://stackoverflow.com/a/46254706/12733140
