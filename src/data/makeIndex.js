const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin').default;

const rowData = require('./rowData.json');

// https://stackoverflow.com/a/29622653/12733140
// 将一个对象根据 key 进行排序, compareFn 可选, 默认按照英文字母顺序排序
const sortObjectByKeys = (o) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => {
      r[k] = o[k];
      return r;
    }, {});

const englishIndexes = rowData.reduce((result, row) => {
  const enFirstLetterUpperCase = row[1][0].toUpperCase();
  if (Object.keys(result).includes(enFirstLetterUpperCase)) {
    result[enFirstLetterUpperCase].push(row[1]);
    // 排序一下
    result[enFirstLetterUpperCase].sort();
  } else {
    result[enFirstLetterUpperCase] = [row[1]];
  }
  return result;
}, {});

const chineseIndexes = rowData.reduce((result, row) => {
  const pyFirstLetterUpperCase = pinyin(row[0], {
    style: 'first_letter',
    segment: true,
  })[0][0].toUpperCase();
  if (Object.keys(result).includes(pyFirstLetterUpperCase)) {
    result[pyFirstLetterUpperCase].push(row[0]);
  } else {
    result[pyFirstLetterUpperCase] = [row[0]];
  }
  return result;
}, {});

const locationIndexes = rowData.reduce((result, row) => {
  const location = row[3];
  if (Object.keys(result).includes(location)) {
    result[location].push(row[0]);
  } else {
    result[location] = [row[0]];
  }
  return result;
}, {});

// 可能可以简略生成索引的抽象函数
const groupRows = (getKeyWithData, sort) => {
  return rowData.reduce((result, row) => {
    const { key, data } = getKeyWithData(row)
    if (Object.keys(result).includes(key)) {
      result[key].push(data);
      sort && result[key].sort()
    } else {
      result[key] = [data];
    }
    return result;
  }, {});
};

// 索引格式为 { en: { A: [], B: [] }, zh: { A: [], B: [], location: { 上海: [], 北京: [] } } }
const indexes = {
  en: sortObjectByKeys(englishIndexes),
  zh: sortObjectByKeys(chineseIndexes),
  location: locationIndexes
};

fs.writeFile(path.join(__dirname, 'indexes.json'), JSON.stringify(indexes, null, 2), (error) => {
  if (error) {
    console.log(error);
  }
  console.log('索引数据成功写入');
});
