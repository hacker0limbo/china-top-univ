import create from 'zustand';
import createAuth from './auth';
import createTable from './table';
import createCharts from './charts'

const createRoot = (set, get) => ({
  ...createAuth(set, get),
  ...createTable(set, get),
  ...createCharts(set, get)
});

const useStore = create(createRoot);

export default useStore;
