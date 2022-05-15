import React, { useState } from 'react';
import { Flex, Search, Toast, DropdownMenu } from 'react-vant';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { WarningO  } from '@react-vant/icons'

import columnData from '../data/columnData.json';
import rowData from '../data/rowData.json';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function UniversityTable() {
  const [searchUnivName, setSearchUnivName] = useState('');
  const [tableRows, setTableRows] = useState(rowData);
  const [searchOption, setSearchOption] = useState({});

  // value 为该 column 在 columnData 中的索引位置
  const searchOptions = [
    { text: '高校中文名稱', value: 0 },
    { text: '高校英文名稱', value: 1 },
    { text: '地區', value: 2 },
    { text: '985', value: 5 },
    { text: '211', value: 6 },
    { text: '2017雙一流', value: 12 },
    { text: '2022雙一流', value: 14 },
  ];

  const handleSearch = value => {
    if (!searchOption.hasOwnProperty('value')) {
      // 没选择搜索条件
      Toast({
        message: '请选择搜索条件',
        icon: <WarningO  />
      })
    } else {
      const searchOptionIndex = searchOption.value
      const filteredRows = rowData.filter((row) => row[searchOptionIndex].includes(value));
      Toast.success({
        message: `检索成功，共检索到 ${filteredRows.length} 条数据`,
        onClose: () => {
          setTableRows(filteredRows);
        },
      });  
    }
  }

  return (
    <Flex direction="column" className="univ-table">
      <Flex direction="row">
        <Flex.Item span={18}>
          <Search
            shape="round"
            value={searchUnivName}
            onChange={setSearchUnivName}
            placeholder="请输入搜索条件"
            onClear={() => {
              setSearchUnivName('');
            }}
            onSearch={handleSearch}
          />
        </Flex.Item>
        <Flex.Item span={6}>
          <DropdownMenu
            value={searchOption}
            onChange={(v) => {
              console.log('当前选中的下拉框索引', v);
              setSearchOption(v);
            }}
          >
            <DropdownMenu.Item name="value" options={searchOptions} />
          </DropdownMenu>
        </Flex.Item>
      </Flex>

      <Table>
        <Thead>
          <Tr>
            {columnData.map((c, i) => (
              <Th key={i}>{c.toString()}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableRows.map((rs, i) => (
            <Tr key={i}>
              {rs.map((r, index) => (
                <Td key={index}>{r}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
