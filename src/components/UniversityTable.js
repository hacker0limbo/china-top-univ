import React, { useState } from 'react';
import { Octokit } from '@octokit/rest';
import * as XLSX from 'xlsx';

export default function UniversityTable() {
  const [tableData, setTableData] = useState({ columns: [], data: [] });

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  octokit.rest.repos
    .getContent({
      owner: 'hacker0limbo',
      repo: 'api',
      path: 'china-top-univ/data.xlsx',
    })
    .then(({ data }) => {
      const workbook = XLSX.read(data.content, { type: 'base64' });
      const arrayData = XLSX.utils.sheet_to_json(workbook.Sheets['高校名單'], {
        header: 1,
        defval: null,
      });
      const columnHeaders = arrayData[1];
      const columnChildren = arrayData[2];
      const rows = arrayData.slice(3, arrayData.length);

      let groupStartIndex = null;
      let groupEndIndex = null;
      const columnData = columnHeaders.reduce((result, columnHeader, index) => {
        if (index === columnHeaders.length - 1) {
          // 最后一个元素
          if (columnHeader === null) {
            // 最后一个元素是 null, 设定结束索引, 等待最后的 grouping 操作
            groupEndIndex = index + 1;
          } else {
            // 常规元素, 无需 group
            result.push({
              title: columnHeader,
              field: columnHeader,
            });
          }
        } else {
          // 非最后一个元素
          if (columnHeader !== null) {
            // 非 null 元素
            if (columnHeaders[index + 1] === null) {
              // 如果非 null 元素下一个元素是 null, 设定开始索引和 children array
              groupStartIndex = index;
              result.push({
                title: columnHeader,
                columns: [],
              });
            } else {
              result.push({
                title: columnHeader,
                field: columnHeader,
              });
            }
          } else {
            // null 元素
            if (columnHeaders[index + 1] !== null) {
              // 如果 null 元素下一个非 null, 设定结束索引
              groupEndIndex = index + 1;
            }
          }
        }

        // 每次循环进行检测, 如果可以插入 grouping 的元素, 进行插入
        if (groupStartIndex !== null && groupEndIndex !== null) {
          for (let i = groupStartIndex; i < groupEndIndex; i++) {
            result[result.length - 1]['columns'].push({
              title: columnChildren[i],
              field: `${result[result.length - 1]['title']}.${columnChildren[i]}`,
            });
          }
          // 插入完毕, 清零
          groupStartIndex = null;
          groupEndIndex = null;
        }
        return result;
      }, []);

      const columnFields = columnChildren.map((v, i) => v === null ? columnHeaders[i] : v)

      const rowData = rows.map((row) => {
        // row 为每一行的学校数据, 例如 [上海大学, 上海, N/A, ...]
        // 返回 column map 过的数据: { 高校名称: 上海大学, 所在地: 上海 }
        return row.reduce((result, cell, index) => {
          result[columnFields[index]] = cell;
          return result;
        }, {});
      });

    })
    .catch((error) => console.log(error));

  return <div className="univ-table">{JSON.stringify(tableData)}</div>;
}
