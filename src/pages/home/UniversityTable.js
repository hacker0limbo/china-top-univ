import React, { useState, useMemo, useLayoutEffect, useRef } from 'react';
import {
  Typography,
  Flex,
  Search,
  Toast,
  Pagination,
  Popup,
  Picker,
  Dialog,
  Form,
  Field,
  Icon,
  Button,
  Radio,
  Cell,
  Lazyload,
  Sticky,
  Empty,
  Tag,
  DropdownMenu,
  Switch,
} from 'react-vant';
import UniversityTableAdvSearchOptionPicker from './UniversityTableAdvSearchOptionPicker';
import UniversityTableAdvSearchContentPicker from './UniversityTableAdvSearchContentPicker';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import titleData from '../../data/titleData.json';
import columnData from '../../data/columnData.json';
import rowData from '../../data/rowData.json';
import { searchOptions } from '../../config/tableConfig';

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
  advSearchListItem: {
    padding: '10px',
  },
  advSearchListItemBody: {
    border: '1px solid var(--rv-gray-3)',
    borderRadius: '6px',
  },
  advSearchListItemAdd: {
    padding: '0 10px 10px 10px',
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
  // 高级搜索
  const [showAdvancedSearchDialog, setShowAdvancedSearchDialog] = useState(false);
  const [advancedSearchForm] = Form.useForm();
  // 值是二元的搜索项
  const dualSearchOptionsNames = searchOptions.filter((o) => o.isDual).map((v) => v.text);
  // 值是多元但可统计的搜索项, 目前只有 辦學模式
  const countedMultipleSearchOptions = searchOptions
    .filter((o) => o.isCountedMultiple)
    .map((option) => ({
      text: option.text,
      countableValues: Array.from(new Set(rowData.map((r) => r[option.value]))),
    }));
  // 用于保存当前(之前 Picker 选择的搜索项)
  const previousSearchItem = useRef(null);
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

  // pagination 下每一页展示的数据
  const tableRowsWithPagination = useMemo(
    () =>
      allowPagination
        ? tableRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        : tableRows,
    [allowPagination, currentPage, rowsPerPage, tableRows]
  );

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

  const handleAdvancedSearch = (values) => {
    const results = values.advancedSearches;
    let filteredRows = [...rowData];
    results.forEach(({ advancedSearchOption, advancedSearchContent }) => {
      const advancedSearchOptionIndex = searchOptions.find(
        (o) => o.text === advancedSearchOption
      ).value;

      filteredRows = filteredRows.filter((row) =>
        row[advancedSearchOptionIndex].includes(advancedSearchContent)
      );
    });
    Toast.success({
      message: `检索成功，共检索到 ${filteredRows.length} 条数据`,
      onClose: () => {
        setTableRows(filteredRows);
        // 设置搜索历史, 这里注意不能使用 tableRows, 因为获取不到其最新值
        setSearchHistory({
          searchStyle: '高级搜索',
          searchOptions: results.reduce(
            (r, { advancedSearchOption, advancedSearchContent }, i, a) => {
              r += dualSearchOptionsNames.includes(advancedSearchOption)
                ? `("${advancedSearchOption}" = "${advancedSearchContent}")`
                : `("${advancedSearchContent}" in "${advancedSearchOption}")`;
              if (i !== a.length - 1) {
                r += ' and ';
              }
              return r;
            },
            ''
          ),
          result: `检索到 ${filteredRows.length} 条数据`,
        });
      },
    });
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
                      border={false}
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
          actionText={
            <div
              onClick={() => {
                setShowAdvancedSearchDialog(true);
              }}
            >
              高级搜索
            </div>
          }
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

        <Flex gutter={8} className={classes.tags} align="center">
          <Flex.Item>
            <Tag
              onClick={() => {
                setTableRows(rowData);
                Toast.success({
                  message: '重设表格成功',
                });
              }}
              size="medium"
              type="default"
            >
              重设表格
            </Tag>
          </Flex.Item>
          <Flex.Item>
            <Tag
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight });
              }}
              size="medium"
              type="default"
            >
              滑直底部
            </Tag>
          </Flex.Item>
        </Flex>
      </Sticky>

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

      <Dialog
        visible={showAdvancedSearchDialog}
        title="高级搜索"
        showCancelButton
        confirmButtonText="搜索"
        onCancel={() => {
          setShowAdvancedSearchDialog(false);
        }}
        onConfirm={() => {
          // 确认按钮只做一件事: 提交表单
          // 验证在 onFinish 和 onFinishFailed 回调里做
          advancedSearchForm.submit();
        }}
      >
        <Form
          showValidateMessage={false}
          form={advancedSearchForm}
          onFinish={(values) => {
            handleAdvancedSearch(values);
            // 关闭 dialog
            setShowAdvancedSearchDialog(false);
          }}
          onFinishFailed={({ values, errorFields }) => {
            // 表单存在错误, 保留表单
            setShowAdvancedSearchDialog(true);
          }}
        >
          <Form.List
            name="advancedSearches"
            initialValue={[{ advancedSearchOption: '', advancedSearchContent: '' }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div className={classes.advSearchListItem} key={field.key}>
                    <Flex justify="between" align="center">
                      <Flex.Item>
                        <Typography.Title level={5}>搜索项目 {index + 1}</Typography.Title>
                      </Flex.Item>
                      <Flex.Item>
                        {fields.length > 1 ? (
                          <Icon
                            name="delete-o"
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        ) : null}
                      </Flex.Item>
                    </Flex>
                    <div className={classes.advSearchListItemBody}>
                      <Form.Item
                        rules={[{ required: true, message: '请选择一个搜索项' }]}
                        name={[field.name, 'advancedSearchOption']}
                        label="搜索项"
                        customField
                      >
                        <UniversityTableAdvSearchOptionPicker
                          form={advancedSearchForm}
                          searchItemIndex={index}
                          resetSearchContentOnConfirm={(value) => {
                            const advancedSearchesValues =
                              advancedSearchForm.getFieldValue('advancedSearches');
                            if (value !== previousSearchItem?.current) {
                              // 选了一个新的 search item, 重设 advancedSearchContent
                              // 否则还是保存之前的 content, 因为 search item 不变
                              advancedSearchesValues[index].advancedSearchContent = '';
                              advancedSearchForm.setFieldsValue({
                                advancedSearches: advancedSearchesValues,
                              });
                              previousSearchItem.current = value;
                            }
                          }}
                          placeholder="请选择搜索项"
                        />
                      </Form.Item>

                      <Form.Item
                        noStyle
                        shouldUpdate={(p, n) =>
                          p.advancedSearches?.[index]?.advancedSearchOption !==
                          n.advancedSearches?.[index]?.advancedSearchOption
                        }
                      >
                        {() => {
                          const countedMultipleSearchOptionsNames =
                            countedMultipleSearchOptions.map((o) => o.text);
                          const currentAdvancedSearchOption =
                            advancedSearchForm.getFieldValue('advancedSearches')?.[index]
                              ?.advancedSearchOption;
                          const countedMultipleSearchOption = countedMultipleSearchOptions.filter(
                            (o) => o.text === currentAdvancedSearchOption
                          )?.[0];

                          // 如果是二元的, 展示为 radio
                          if (dualSearchOptionsNames.includes(currentAdvancedSearchOption)) {
                            return (
                              <Form.Item
                                label="搜索条件"
                                name={[field.name, 'advancedSearchContent']}
                                rules={[{ required: true, message: '请选择搜索条件' }]}
                                showValidateMessage
                              >
                                <Radio.Group direction="horizontal">
                                  <Radio name="是">是</Radio>
                                  <Radio name="N/A">N/A</Radio>
                                </Radio.Group>
                              </Form.Item>
                            );
                          }

                          // 如果是多元可计数的, 展示为 picker
                          if (
                            countedMultipleSearchOptionsNames.includes(currentAdvancedSearchOption)
                          ) {
                            return (
                              <Form.Item
                                label="搜索条件"
                                name={[field.name, 'advancedSearchContent']}
                                rules={[{ required: true, message: '请选择搜索条件' }]}
                                customField
                              >
                                <UniversityTableAdvSearchContentPicker
                                  placeholder="选择搜索条件"
                                  countedMultipleSearchOption={countedMultipleSearchOption}
                                />
                              </Form.Item>
                            );
                          }

                          // 默认为输入框
                          return (
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: '请输入搜索条件内容',
                                },
                              ]}
                              label="搜索条件"
                              name={[field.name, 'advancedSearchContent']}
                              initialValue=""
                            >
                              <Field placeholder="请输入搜索条件内容" />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                    </div>
                  </div>
                ))}
                <div className={classes.advSearchListItemAdd}>
                  <Button
                    round
                    block
                    plain
                    icon="add-o"
                    size="small"
                    onClick={() => {
                      add();
                    }}
                  >
                    新增搜索项目
                  </Button>
                </div>
              </>
            )}
          </Form.List>
        </Form>
      </Dialog>

      {/* 渲染表格数据 */}
      {renderTableBody()}

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
