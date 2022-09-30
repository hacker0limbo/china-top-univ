// 配置 table 搜索选项
// value 为该 column 在 columnData 中的索引位置
export const searchOptions = [
  { text: '高校中文名稱', value: 0 },
  { text: '高校英文名稱', value: 1 },
  { text: '所在地', value: 3 },
  { text: '中管高校', value: 7, isDual: true },
  { text: '辦學模式', value: 8, isCountedMultiple: true },
  { text: '985', value: 10, isDual: true },
  { text: '211', value: 11, isDual: true },
  { text: '2022雙一流', value: 14, isDual: true },
];

// 表格定制化分隔符, 存取的数据为 column 索引
// 依次为: [學校標識碼, 辦學模式, 2022雙一流警/撤, USNEWS 2022]
export const tableSeparators = [2, 8, 16, 20]

// 定制化需求, 2017雙一流 和 2017雙一流學科所在的位置
export const doubleTops2017Range = [12, 13]