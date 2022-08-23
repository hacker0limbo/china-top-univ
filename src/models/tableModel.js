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
  },
};
