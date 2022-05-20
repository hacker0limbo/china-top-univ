const createTable = (set) => ({
  allowPagination: false,
  rowsPerPage: 5,
  setPagination: (value) => set((state) => ({ allowPagination: value })),
  setRowsPerPage: (value) => set((state) => ({ rowsPerPage: value })),
});

export default createTable;
