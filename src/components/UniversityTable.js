import React, { useState } from 'react';
import { Flex, Search, Toast } from 'react-vant';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import columnData from '../data/columnData.json';
import rowData from '../data/rowData.json';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function UniversityTable() {
  const [searchUnivName, setSearchUnivName] = useState('');
  const [tableRows, setTableRows] = useState(rowData);

  return (
    <Flex direction="column" className="univ-table">
      <Search
        shape="round"
        value={searchUnivName}
        onChange={setSearchUnivName}
        placeholder="请输入高校名称"
        onClear={() => {
          setSearchUnivName('');
        }}
        onSearch={(val) => {
          const filteredRows = rowData.filter((row) => row[0].includes(val))
          Toast.success({
            message: `检索成功，共检索到 ${filteredRows.length} 条数据`,
            onClose: () => {
              setTableRows(filteredRows)
            }
          })
        }}
      />

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
