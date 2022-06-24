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
} from 'react-vant';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import useStore from '../store';
import UniversityTableAdvSearchOptionPicker from './UniversityTableAdvSearchOptionPicker';
import UniversityTableAdvSearchContentPicker from './UniversityTableAdvSearchContentPicker';

import titleData from '../data/titleData.json';
import columnData from '../data/columnData.json';
import rowData from '../data/rowData.json';
import { searchOptions } from '../config/tableConfig';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../styles/UniversityTable.css';

export default function UniversityTable() {
  // 标题和更新日期
  const [titleName, updateDate] = titleData;
  // 基本搜索
  const [searchUnivName, setSearchUnivName] = useState('');
  const [searchOption, setSearchOption] = useState({ value: 0 });
  const [showSearchOptionsPicker, setShowSearchOptionsPicker] = useState(false);
  // 高级搜索
  const [showAdvancedSearchDialog, setShowAdvancedSearchDialog] = useState(false);
  const [advancedSearchForm] = Form.useForm();
  // 值是二元的搜索项
  const dualSearchOptionsNames = searchOptions.filter((o) => o.isDual).map((v) => v.text);
  // 值是多元但可统计的搜索项, 目前只有
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
  const allowPagination = useStore((state) => state.table.pagination.allowPagination);
  const rowsPerPage = useStore((state) => state.table.pagination.rowsPerPage);
  // 每次操作完 pagination 后设置为 true
  const [resetScrollBar, setResetScrollBar] = useState(false);

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

  return (
    <Flex direction="column" className="univ-table">
      <Typography.Title center level={2}>
        {titleName}
      </Typography.Title>
      <Typography.Title center level={4}>
        {updateDate}
      </Typography.Title>

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
        // shape="round"
        value={searchUnivName}
        onChange={setSearchUnivName}
        placeholder="请输入搜索条件"
        onClear={() => {
          setSearchUnivName('');
        }}
        onSearch={handleSearch}
      />

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
                  <div className="adv-search-list-item" key={field.key}>
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
                    <div className="adv-search-list-item-control">
                      <Form.Item
                        rules={[{ required: true, message: '请选择一个搜索项' }]}
                        name={[field.name, 'advancedSearchOption']}
                        label="搜索项"
                        customField
                      >
                        <UniversityTableAdvSearchOptionPicker
                          form={advancedSearchForm}
                          searchItemIndex={index}
                          onChange={(value) => {
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
                              rules={[{ required: true, message: '请输入搜索条件内容' }]}
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
                <div className="adv-search-list-item-add">
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
              setResetScrollBar(true);
            }}
          />
        </div>
      ) : null}
    </Flex>
  );
}
