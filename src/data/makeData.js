const { Octokit } = require('@octokit/rest');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
  auth: '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',
});

function getLocationData(columnData, rowData, filterOption, chartType = 'bar') {
  // 根据 rowData 和 columnData 整理得到 filter 过的各地区相关高校数量, filter 可选值为: 985, 211, 2022雙一流
  // 格式为 [{ location: 上海, count: 20 }, ...]
  const locationIndex = columnData.findIndex((c) => c.toString() === '所在地');
  const filterOptionIndex = columnData.findIndex((c) => c.toString() === filterOption.toString());

  // 根据筛选条件筛选符合的 row
  const filteredRowData = rowData.filter((r) => r[filterOptionIndex] === '是');

  // { 上海: 10, 北京: 20, ... }
  const locationDataObject = filteredRowData.reduce((result, row) => {
    if (result.hasOwnProperty(row[locationIndex])) {
      result[row[locationIndex]] += 1;
    } else {
      result[row[locationIndex]] = 1;
    }
    return result;
  }, {});

  const locationData = Object.entries(locationDataObject).reduce((result, [name, value]) => {
    if (chartType === 'bar') {
      result.push({ location: name, count: value });
    } else if (chartType === 'pie') {
      // 饼图数据每一条记录中必须包含一个常量字段, 且必须是字符串类型
      result.push({
        location: name,
        count: value,
        ratio: value / filteredRowData.length,
        const: 'const',
      });
    }
    return result;
  }, []);

  return locationData;
}

octokit.rest.repos
  .getContent({
    owner: 'hacker0limbo',
    repo: 'api',
    path: 'china-top-univ/data.xlsx',
  })
  .then(({ data }) => {
    const workbook = XLSX.read(data.content, { type: 'base64' });
    // defval 设为 N/A, 保证即使没有数据也存在数据
    const arraySchoolData = XLSX.utils.sheet_to_json(workbook.Sheets['高校名單'], {
      header: 1,
      defval: 'N/A',
    });
    const [[tableTitle], columnData, ...rowData] = arraySchoolData;
    const location985BarData = getLocationData(columnData, rowData, '985', 'bar');
    const location985PieData = getLocationData(columnData, rowData, '985', 'pie');
    const location211BarData = getLocationData(columnData, rowData, '211', 'bar');
    const location211PieData = getLocationData(columnData, rowData, '211', 'pie');
    const locationDoubleTopsBarData = getLocationData(columnData, rowData, '2022雙一流', 'bar');
    const locationDoubleTopsPieData = getLocationData(columnData, rowData, '2022雙一流', 'pie');
    const locationData = {
      985: {
        bar: location985BarData,
        pie: location985PieData,
      },
      211: {
        bar: location211BarData,
        pie: location211PieData,
      },
      doubleTops: {
        bar: locationDoubleTopsBarData,
        pie: locationDoubleTopsPieData,
      },
    };

    const arrayUpdateData = XLSX.utils.sheet_to_json(workbook.Sheets['@更新日誌'], {
      header: 1,
    });
    const updateData = arrayUpdateData.filter((v) => v.length > 0);

    const arrayDisclaimerData = XLSX.utils.sheet_to_json(workbook.Sheets['@免責聲明'], {
      header: 1,
    });
    const disclaimerData = arrayDisclaimerData[0][0]
      .split(/\r\n/)
      .slice(1)
      .map((v) => v.slice(2));

    fs.writeFile(
      path.join(__dirname, 'titleData.json'),
      JSON.stringify(tableTitle.split(/\r\n/), null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('title 数据成功写入');
      }
    );

    fs.writeFile(
      path.join(__dirname, 'columnData.json'),
      JSON.stringify(columnData, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('columns 数据成功写入');
      }
    );

    fs.writeFile(
      path.join(__dirname, 'rowData.json'),
      JSON.stringify(rowData, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('rows 数据成功写入');
      }
    );

    fs.writeFile(
      path.join(__dirname, 'locationData.json'),
      JSON.stringify(locationData, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('location 数据成功写入');
      }
    );

    fs.writeFile(
      path.join(__dirname, 'updateData.json'),
      JSON.stringify(updateData, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('update 数据成功写入');
      }
    );

    fs.writeFile(
      path.join(__dirname, 'disclaimerData.json'),
      JSON.stringify(disclaimerData, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log('disclaimer 数据成功写入');
      }
    );
  });
