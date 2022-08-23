import { authModel } from './authModel';
import { chartModel } from './chartModel';
import { tableModel } from './tableModel';

// 类似 combineReducers, 集合所有 reducer 并给定 namespace
export const models = {
  auth: authModel,
  charts: chartModel,
  table: tableModel,
};
