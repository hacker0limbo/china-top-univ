import React, { useState, useMemo, useLayoutEffect } from 'react';
import { Typography, Flex, Search, Toast, DropdownMenu, Pagination } from 'react-vant';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import useStore from '../store';

import titleData from '../data/titleData.json';
import columnData from '../data/columnData.json';
import rowData from '../data/rowData.json';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../styles/UniversityTable.css';

export default function UniversityTable() {
  const [searchUnivName, setSearchUnivName] = useState('');
  const [tableRows, setTableRows] = useState(rowData);
  const [searchOption, setSearchOption] = useState({});
  const [titleName, updateDate] = titleData;
  const [currentPage, setCurrentPage] = useState(1);
  const allowPagination = useStore((state) => state.allowPagination);
  const rowsPerPage = useStore((state) => state.rowsPerPage);
  // 每次操作完 pagination 后设置为 true
  const [resetScrollBar, setResetScrollBar] = useState(false);

  const tableRowsWithPagination = useMemo(
    () =>
      allowPagination
        ? tableRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        : tableRows,
    [allowPagination, currentPage, rowsPerPage, tableRows]
  );

  // value 为该 column 在 columnData 中的索引位置
  const searchOptions = [
    { text: '高校中文名稱', value: 0 },
    { text: '高校英文名稱', value: 1 },
    { text: '地區', value: 2 },
    { text: '985', value: 6 },
    { text: '211', value: 7 },
    { text: '2017雙一流', value: 8 },
    { text: '2022雙一流', value: 10 },
  ];

  const handleSearch = (value) => {
    if (!searchOption.hasOwnProperty('value')) {
      // 没选择搜索条件
      Toast({
        message: '请选择搜索条件',
        icon: 'warning-o',
      });
    } else {
      const searchOptionIndex = searchOption.value;
      const filteredRows = rowData.filter((row) => row[searchOptionIndex].includes(value));
      Toast.success({
        message: `检索成功，共检索到 ${filteredRows.length} 条数据`,
        onClose: () => {
          setTableRows(filteredRows);
        },
      });
    }
  };

  useLayoutEffect(() => {
    // 当使用分页进行操作时如果数据长度变长会导致滚动条出现问题
    // 这里在每次分页操作后判断是否需要重设滚动条到底部, 保证 pagination 能一直被看见
    if (resetScrollBar) {
      if ((window.innerHeight + window.pageYOffset) < document.body.offsetHeight) {
        // 判断是否在底部
        // https://stackoverflow.com/a/40370876/12733140
        window.scrollTo({ top: document.body.scrollHeight });
      }
      setResetScrollBar(false);  
    }
  }, [resetScrollBar]);

  return (
    <Flex direction="column" className="univ-table">
      <Typography.Title center level={2}>
        {titleName}
      </Typography.Title>
      <Typography.Title center level={4}>
        {updateDate}
      </Typography.Title>

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
              setSearchOption(v);
            }}
          >
            <DropdownMenu.Item name="value" options={searchOptions} />
          </DropdownMenu>
        </Flex.Item>
      </Flex>

      <div className="univ-table-body">
        <Table>
          <Thead>
            <Tr>
              {columnData.map((c, i) => (
                <Th key={i}>{c.toString()}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableRowsWithPagination.map((rs, i) => (
              <Tr key={i}>
                {rs.map((r, index) => (
                  <Td key={index}>{r}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {allowPagination ? (
        <div className="univ-table-pagination">
          <Pagination
            forceEllipses
            totalItems={rowData.length}
            itemsPerPage={rowsPerPage}
            value={currentPage}
            onChange={(nextPage) => {
              setCurrentPage(nextPage);
              setResetScrollBar(true)
            }}
          />
        </div>
      ) : null}
    </Flex>
  );
}
