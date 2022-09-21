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
    tableStyle: {
      // 是否为紧凑型的原始样式
      compact: false,
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
    setTableStyle: (state, payload) => {
      return {
        ...state,
        tableStyle: {
          ...state.tableStyle,
          compact: payload,
        },
      };
    },
  },
};
