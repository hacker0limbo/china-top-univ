/**
 * 表格 model, 目前只涉及 pagination 状态
 */
export const tableModel = {
  name: 'table',
  state: {
    pagination: {
      allowPagination: false,
      rowsPerPage: 5,
    },
    tableData: {
      showInvalidData: false,
      showDoubleTops2017Data: false,
    },
  },
  reducers: {
    setAllowPagination: (state, payload) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          allowPagination: payload,
        },
      };
    },
    setRowsPerPage: (state, payload) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          rowsPerPage: payload,
        },
      };
    },
    toggleInvalidData: (state, payload) => {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          showInvalidData: payload,
        },
      };
    },
    toggleDoubleTops2017Data: (state, payload) => {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          showDoubleTops2017Data: payload,
        },
      };
    },
  },
};
