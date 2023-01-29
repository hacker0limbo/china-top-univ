# 数据集

## 生成数据

- `makeUnivData.js`: 生成 `rowData.json`
- `makeIndex.js`: 生成 `indexes.json`
- `makeLocationData.js`: 生成 `locationData.json`
- `makeUpdateData.js`: 生成 `updateData.json`

其中, `makeIndex.js` 和 `makeLocationData.js` 需要等 `makeUnivData.js` 跑完再进行

其余数据均可通过 csv 直接拷贝进去

## 数据结构

- `source`: 原始数据, 由于私密性暂时不上传
- `columnData.json`: 高校表头名称
- `columnEnData.json`: 高校表头的英文名称
- `disclaimerData.json`: 免责声明数据, 基本不会有更改
- `indexes.json`: 索引数据, 由 `rawData` 生成
- `locationData.json`: 高校地区分布数据, 由 `rawData` 和 `columnData` 生成
- `rowData.json`: 表格数据
- `titleData.json`: 表格标题
- `updateData.json`: 表格更新日志
