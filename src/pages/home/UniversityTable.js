import React, { useState, useMemo, useLayoutEffect, useRef } from 'react';
import {
  Flex,
  Search,
  Toast,
  Pagination,
  Popup,
  Picker,
  Dialog,
  Form,
  Icon,
  Button,
  Cell,
  Lazyload,
  Sticky,
  Empty,
  DropdownMenu,
  Switch,
  Slider,
} from 'react-vant';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import titleData from '../../data/titleData.json';
import columnData from '../../data/columnData.json';
import rowData from '../../data/rowData.json';
import { searchOptions, tableSeparators, sortOptions } from '../../config/tableConfig';

const useStyles = createUseStyles({
  header: {
    padding: '20px 16px 10px 16px',
    fontSize: '1.1em',
    fontWeight: 400,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'var(--rv-white)',
  },
  settings: {
    display: 'inline-block',
    '& .rv-dropdown-menu__bar': {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    '& .rv-dropdown-menu__title:after': {
      content: 'none',
    },
  },
  tags: {
    backgroundColor: 'var(--rv-white)',
    padding: '0 16px 10px 16px',
  },
  actions: {
    '& .rv-dropdown-menu__bar': {
      // backgroundColor: 'inherit',
      boxShadow: 'none',
    },
  },
  filterActionSliderButton: {
    width: '30px',
    color: 'var(--rv-white)',
    fontSize: '10px',
    lineHeight: '18px',
    textAlign: 'center',
    backgroundColor: 'var(--rv-red)',
    borderRadius: '100px',
    userSelect: 'none',
  },
  filterActionFooter: {
    padding: '16px',
  },
  tableBody: {
    margin: '16px 0',
  },
  tablePagination: {
    margin: '16px',
  },
  highlightedSearchOption: {
    color: '#ee0a24',
  },
  highlightedSearchValue: {
    backgroundColor: '#ffff00',
  },
});

export default function UniversityTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // 标题和更新日期
  const [titleName] = titleData;
  // 基本搜索
  const [searchUnivName, setSearchUnivName] = useState('');
  const [searchOption, setSearchOption] = useState({ value: 0 });
  const [showSearchOptionsPicker, setShowSearchOptionsPicker] = useState(false);
  // 排序搜索操作的 dropdown 引用
  const actionDropdownRef = useRef(null);
  // 表格是排序
  const [tableSort, setTableSort] = useState({ sortUniv: null });
  // 表格筛选
  const [tableFilterForm] = Form.useForm();
  // 建校时间两个极值, 分别为数据集最小值 -10 和 最大值 + 10
  const minEstablishYear = useMemo(() => Math.min(...rowData.map((r) => r[4])) - 10, []);
  const maxEstablishYear = useMemo(() => Math.max(...rowData.map((r) => r[4])) + 10, []);
  const [establishYearRange, setEstablishYearRange] = useState([
    minEstablishYear,
    maxEstablishYear,
  ]);
  // 表格分页和数据
  const [tableRows, setTableRows] = useState(rowData);
  const [currentPage, setCurrentPage] = useState(1);
  // 表格数据展示
  const showInvalidData = useSelector((state) => state.table.tableData.showInvalidData);
  const allowPagination = useSelector((state) => state.table.pagination.allowPagination);
  const rowsPerPage = useSelector((state) => state.table.pagination.rowsPerPage);
  // 每次操作完 pagination 后设置为 true
  const [resetScrollBar, setResetScrollBar] = useState(false);
  // 上一次的搜索历史, 初始显示所有数据
  const [searchHistory, setSearchHistory] = useState({
    searchStyle: 'N/A',
    searchOptions: 'N/A',
    result: `检索到 ${rowData.length} 条数据`,
  });
  // 排序后的数据
  const sortedTableRows = useMemo(() => {
    if (tableSort.sortUniv) {
      const indexValue = tableSort.sortUniv[0];
      if (tableSort.sortUniv.includes('a')) {
        // 升序
        return [...tableRows].sort((a, b) => a[indexValue] - b[indexValue]);
      } else {
        // 降序
        return [...tableRows].sort((a, b) => b[indexValue] - a[indexValue]);
      }
    } else {
      return tableRows;
    }
  }, [tableRows, tableSort.sortUniv]);
  // pagination 下每一页展示的数据
  const tableRowsWithPagination = useMemo(
    () =>
      allowPagination
        ? sortedTableRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        : sortedTableRows,
    [allowPagination, currentPage, rowsPerPage, sortedTableRows]
  );

  console.log('values', tableFilterForm.getFieldsValue());

  const handleSearch = (value) => {
    if (!searchOption.hasOwnProperty('value')) {
      // 没选择搜索条件
      Toast({
        message: '请选择搜索项',
        icon: 'warning-o',
      });
    } else {
      const searchOptionIndex = searchOption.value;
      const filteredRows = rowData.filter((row) => row[searchOptionIndex].includes(value));
      Toast.success({
        message: `检索成功，共检索到 ${filteredRows.length} 条数据`,
        onClose: () => {
          setTableRows(filteredRows);
          // 设置搜索历史, 这里注意不能使用 tableRows, 因为获取不到其最新值
          searchUnivName &&
            setSearchHistory({
              searchStyle: '基本搜索',
              searchOptions: `"${searchUnivName}" in "${columnData[searchOption.value]}"`,
              result: `检索到 ${filteredRows.length} 条数据`,
            });
        },
      });
    }
  };

  useLayoutEffect(() => {
    // 当使用分页进行操作时如果数据长度变长会导致滚动条出现问题
    // 这里在每次分页操作后判断是否需要重设滚动条到底部, 保证 pagination 能一直被看见
    if (resetScrollBar) {
      if (window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // 判断是否在底部
        // https://stackoverflow.com/a/40370876/12733140
        window.scrollTo({ top: document.body.scrollHeight });
      }
      setResetScrollBar(false);
    }
  }, [resetScrollBar]);

  // 渲染表格, 由于渲染时包含逻辑处理, 所以抽成一个函数
  const renderTableBody = () => {
    if (tableRows.length) {
      return (
        <>
          {tableRowsWithPagination.map((rs, rsIndex) => (
            <Lazyload key={rsIndex}>
              <Cell.Group inset className={classes.tableBody}>
                {rs.map((info, i) => {
                  if (!showInvalidData && info === 'N/A') {
                    return null;
                  }

                  return (
                    <Cell
                      border={
                        // 当分割线这行的数据不存在值时会导致分割线不展示, 解决方法是让其上一行数据显示分割线
                        // 即判断条件为下一条数据为分割线数据, 且下一条数据的值为空
                        tableSeparators.includes(i) ||
                        (!showInvalidData && rs[i + 1] === 'N/A' && tableSeparators.includes(i + 1))
                          ? true
                          : false
                      }
                      key={i}
                      title={columnData[i]}
                      titleClass={
                        searchUnivName && searchOption.value === i
                          ? classes.highlightedSearchOption
                          : ''
                      }
                    >
                      {searchUnivName && searchOption.value === i ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: info.replace(searchUnivName, `<mark>${searchUnivName}</mark>`),
                          }}
                        />
                      ) : (
                        <div>{info}</div>
                      )}
                    </Cell>
                  );
                })}
              </Cell.Group>
            </Lazyload>
          ))}
        </>
      );
    } else {
      // 数据为空
      return <Empty description="暂无相关数据" />;
    }
  };

  return (
    <div>
      <Sticky>
        <header className={classes.header}>
          <Flex justify="between" align="baseline">
            <Flex.Item>{titleName}</Flex.Item>
            <Flex.Item>
              <DropdownMenu className={classes.settings}>
                <DropdownMenu.Item title={<Icon size="20" name="setting-o" />}>
                  <Cell center title="显示无效数据">
                    <Switch
                      checked={showInvalidData}
                      size={24}
                      onChange={(checkedValue) => {
                        dispatch.table.toggleInvalidData(checkedValue);
                      }}
                    />
                  </Cell>
                  <Cell center title="开启分页">
                    <Switch
                      size={24}
                      checked={allowPagination}
                      onChange={(checkedValue) => {
                        dispatch.table.setAllowPagination(checkedValue);
                      }}
                    />
                  </Cell>
                </DropdownMenu.Item>
              </DropdownMenu>
              <Icon
                size="20"
                name="points"
                badge={{ content: tableRows.length }}
                onClick={() => {
                  Dialog.alert({
                    title: '当前搜索情况与结果',
                    children: (
                      <Cell.Group inset>
                        <Cell title="搜索形式" value={searchHistory.searchStyle} />
                        <Cell title="搜索条件" value={searchHistory.searchOptions} />
                        <Cell title="搜索结果" value={searchHistory.result} />
                      </Cell.Group>
                    ),
                  });
                }}
              />
            </Flex.Item>
          </Flex>
        </header>

        <Search
          leftIcon={<div>&nbsp;</div>}
          rightIcon={
            <Icon
              onClick={() => {
                handleSearch(searchUnivName);
              }}
              name="search"
            />
          }
          showAction
          actionText={null}
          label={
            <div
              onClick={() => {
                setShowSearchOptionsPicker(true);
              }}
            >
              {Object.keys(searchOption).length > 0
                ? searchOptions.find((s) => s.value === searchOption.value).text
                : '请选择'}
            </div>
          }
          shape="round"
          value={searchUnivName}
          onChange={setSearchUnivName}
          placeholder="请输入搜索条件"
          onClear={() => {
            setSearchUnivName('');
          }}
          onSearch={handleSearch}
        />

        {/* 排序和筛选 */}
        <DropdownMenu
          ref={actionDropdownRef}
          className={classes.actions}
          value={tableSort}
          onChange={(value) => {
            setTableSort(value);
          }}
        >
          <DropdownMenu.Item name="sortUniv" options={sortOptions} />
          <DropdownMenu.Item name="filterUniv" title="全部筛选">
            <div className={classes.filterAction}>
              <Form
                initialValues={{
                  establishTime: [minEstablishYear, maxEstablishYear],
                }}
                border={false}
                layout="vertical"
                onFinish={(values) => {
                  console.log('onFinish', values);
                }}
                form={tableFilterForm}
              >
                <Form.Item name="establishTime" label="建校时间">
                  <Slider
                    style={{ margin: '0 16px' }}
                    leftButton={
                      <div className={classes.filterActionSliderButton}>
                        {establishYearRange[0]}
                      </div>
                    }
                    rightButton={
                      <div className={classes.filterActionSliderButton}>
                        {establishYearRange[1]}
                      </div>
                    }
                    onChange={(value) => {
                      setEstablishYearRange(value);
                    }}
                    range
                    min={minEstablishYear}
                    max={maxEstablishYear}
                  />
                </Form.Item>
              </Form>

              <Flex gutter={16} className={classes.filterActionFooter}>
                <Flex.Item span={12}>
                  <Button
                    block
                    type="default"
                    onClick={() => {
                      actionDropdownRef.current?.close();
                    }}
                  >
                    重置
                  </Button>
                </Flex.Item>
                <Flex.Item span={12}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      tableFilterForm.submit();
                      actionDropdownRef.current?.close();
                    }}
                  >
                    完成
                  </Button>
                </Flex.Item>
              </Flex>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu>
      </Sticky>

      {/* 底部搜索项 */}
      <Popup
        safeAreaInsetBottom
        round
        visible={showSearchOptionsPicker}
        position="bottom"
        onClose={() => {
          setShowSearchOptionsPicker(false);
        }}
      >
        <Picker
          title="请选择搜索项"
          columns={searchOptions.map((s) => s.text)}
          onConfirm={(v) => {
            const searchItemIndex = searchOptions.find((s) => s.text === v).value;
            setSearchOption({ value: searchItemIndex });
            setShowSearchOptionsPicker(false);
          }}
          onCancel={() => {
            setShowSearchOptionsPicker(false);
          }}
        />
      </Popup>

      {/* 渲染表格数据 */}
      {renderTableBody()}

      {/* 分页 */}
      {allowPagination ? (
        <div className={classes.tablePagination}>
          <Pagination
            forceEllipses
            totalItems={tableRows.length}
            itemsPerPage={rowsPerPage}
            value={currentPage}
            onChange={(nextPage) => {
              setCurrentPage(nextPage);
              setResetScrollBar(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
