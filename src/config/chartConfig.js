import rawData from '../data/rowData.json';

// 高校建校时间对应的索引
const establishmentIndex = 4;
const indexOf985 = 11;
const indexOf211 = 12;
const doubleTopsIndex = 13;

/**
 * 生成建校时间高校数量的数据, 按照时间排序
 * @param {*} data 原始数据, 参考 rawData
 * @returns [[1985, 5], [2000, 8], ...]
 */
function makeEstablishmentData(data) {
  return [
    ...data.reduce((r, raw, i) => {
      for (const [k, v] of Object.entries(r)) {
        if (v[0] === raw[establishmentIndex].toString()) {
          r[k][1] += 1;
          return r;
        }
      }
      return [...r, [raw[establishmentIndex].toString(), 1]];
    }, []),
  ].sort((a, b) => Number(a[0]) - Number(b[0]));
}

export const establishmentData = [
  { name: '所有高校', data: makeEstablishmentData(rawData) },
  {
    name: '985高校',
    data: makeEstablishmentData(rawData.filter((row) => row[indexOf985] === '是')),
  },
  {
    name: '211高校',
    data: makeEstablishmentData(rawData.filter((row) => row[indexOf211] === '是')),
  },
  {
    name: '双一流高校',
    data: makeEstablishmentData(rawData.filter((row) => row[doubleTopsIndex] === '是')),
  },
];
