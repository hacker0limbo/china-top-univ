const createTable = (set) => ({
  table: {
    pagination: {
      allowPagination: false,
      rowsPerPage: 5,
    },
  },
  tableActions: {
    setAllowPagination: (value) => {
      set((state) => ({
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            allowPagination: value,
          },
        },
      }));
    },
    setRowsPerPage: (value) => {
      set((state) => ({
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            rowsPerPage: value,
          },
        },
      }));
    },
  },
});

export default createTable;
