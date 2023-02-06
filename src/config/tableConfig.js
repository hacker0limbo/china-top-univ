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

// 排序的选项, value 的格式为 '[索引][a/d]', 其中 a 代表升序从小到大排序, d 代表降序, 从大到小排序
export const sortOptions = [
  { text: '默认排序', value: null },
  { text: '校史升序', value: '5a' },
  { text: '校史降序', value: '5d' },
];

// 表格定制化分隔符, 存取的数据为 column 索引
// 依次为: [學校標識碼, 辦學模式, 2022雙一流警/撤, USNEWS 2022]
export const tableSeparators = [2, 9, 15, 19];

// 索引里需要展示的 tag 对应的数据
// value 为该 column 在 columnData 中的索引位置
export const referenceTagOptions = [
  {
    text: 'C9',
    indexValue: 10,
    type: 'danger',
  },
  {
    text: '985',
    indexValue: 11,
    type: 'danger',
  },
  {
    text: '211',
    indexValue: 12,
    type: 'primary',
  },
  {
    text: '雙一流',
    indexValue: 13,
    type: 'success',
  },
  {
    text: '中管高校',
    indexValue: 8,
    type: 'warning',
  },
];

// 索引里展示的 info 的数据
export const referenceInfoOptions = [
  {
    text: '所在地',
    indexValue: 3,
  },
  {
    text: '主管部門',
    indexValue: 7,
  },
  {
    text: '辦學模式',
    indexValue: 9,
  },
];
