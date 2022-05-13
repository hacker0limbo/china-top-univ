# 中国一流高校搜索程序

## 技术栈

- [Tabulator](http://tabulator.info/)
- [SheetJS](https://sheetjs.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## 思路

使用 Github 存储 excel 文件作为后端静态文件托管, 每次通过 Github 提供的 Restful API 请求文件, xlsx 处理成 JSON 格式传给前端的表格库. 用户也可以自行上传 excel 文件覆盖默认数据. 修改和保存数据也应该能实现