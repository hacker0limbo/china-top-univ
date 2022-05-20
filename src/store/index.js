import create from 'zustand';
import createAuth from './auth';
import createTable from './table';

const createRoot = (set) => ({
  ...createAuth(set),
  ...createTable(set),
});

const useStore = create(createRoot);

export default useStore;
