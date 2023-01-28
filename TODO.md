# TODO

Project's todos will be documented in this file.

The format is based on [TODO.md](https://github.com/todomd/todo.md)

## Todo

- [ ] 使用 TypeScript 重构
  - [ ] React vant
  - [ ] React
  - [ ] Rematch
  - [ ] React Router
- [ ] React-vant 升级为 v3
  - [ ] icon 组件分离
  - [ ] css 无需手动引入
  - [ ] cell card 类型的属性名从 inset 改为 card
  - [ ] `ConfigProvider` 设置多语言
  - [ ] 表单重构
    - [ ] Field 组件改为 Input
    - [ ] `Form.useWatch` 代替 `onValuesChange` 进行单个表单字段的监听
    - [ ] 表单样式可能需要加上 cell 属性
    - [ ] Picker 组件重构
    - [ ] Pagination 存在状态变更后没有重新根据最新状态重新渲染, 升级后自动解决
    - [ ] 图表页等使用升级后的 Card 组件重构
  - [ ] 增加选择组, 例如直接直接有为 985 的选项, 通过下拉框展示
- [ ] 数据改为 csv 生成而非 xlsx
- [ ] 接入云后端, 实现登录注册验证等功能
  - [ ] 数据考虑存入后端, 实现可上传, 可编辑的功能
  - [ ] 角色权限
- [ ] 接入微信等方式的分享

## In Progress

- [ ] 取消显示分割线
- [ ] 数据更新
  - [ ] 主页搜索条件对应字段的索引位置
  - [ ] 主页表格展示的分割线对应其上字段的索引位置
  - [ ] 主页表格数据中的 column 名是否改变

## Done ✓

- [x] React 升级为最新
- [x] React Router 升级到最新
  - [x] 增加登录后重定向功能
- [x] 暗黑主题
  - [x] 可根据系统主题适配: https://stackoverflow.com/a/57795495
- [x] 多维联动搜索
- [x] 索引页面
- [x] 图表页面
- [x] 路由
