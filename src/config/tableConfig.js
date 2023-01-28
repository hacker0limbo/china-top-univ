// 配置 table 搜索选项
// value 为该 column 在 columnData 中的索引位置
export const searchOptions = [
  { text: '中文名稱', value: 0 },
  { text: '英文名稱', value: 1 },
  { text: '所在地', value: 3 },
  { text: '中管高校', value: 8, isDual: true },
  { text: '辦學模式', value: 9, isCountedMultiple: true },
  { text: '985', value: 11, isDual: true },
  { text: '211', value: 12, isDual: true },
  { text: '雙一流', value: 13, isDual: true },
];
