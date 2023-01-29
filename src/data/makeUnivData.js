const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const univFilePath = path.join(__dirname, 'source', 'univ.csv');

fs.readFile(univFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取表格数据失败');
    return;
  }
  parse(
    data,
    {
      bom: true,
      cast: true,
      trim: true,
      skip_empty_lines: true,
      skip_records_with_empty_values: true,
    },
    (err, rowData) => {
      const rowDataWithoutEmpty = rowData.map((r) => r.filter((v) => v !== ''));
      fs.writeFile(
        path.join(__dirname, 'rowData.json'),
        JSON.stringify(rowDataWithoutEmpty, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          }
          console.log('rows 数据成功写入');
        }
      );
    }
  );
});
