const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const updateFilePath = path.join(__dirname, 'source', 'update.csv');

fs.readFile(updateFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取表格数据失败');
    return;
  }
  parse(
    data,
    {
      bom: true,
      cast: true,
      trim: false,
      skip_empty_lines: true,
      skip_records_with_empty_values: true,
    },
    (err, updateData) => {
      const updateDataWithoutEmpty = updateData.map((r) => r.filter((v) => v !== ''));
      fs.writeFile(
        path.join(__dirname, 'updateData.json'),
        JSON.stringify(updateDataWithoutEmpty, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          }
          console.log('update 数据成功写入');
        }
      );
    }
  );
});
