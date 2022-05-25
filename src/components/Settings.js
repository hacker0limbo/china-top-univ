import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Cell, Switch, Button, Dialog, Divider, Stepper, ActionSheet } from 'react-vant';
import useStore from '../store';
import { setPersistAuth, getPersistAuth, removePersistAuth } from '../utils';
import { CHARTS } from '../constants/store';

export default function Settings() {
  const navigate = useNavigate();
  // auth 相关状态与处理
  const [rememberToken, setRememberToken] = useState(getPersistAuth());
  const logout = useStore((state) => state.authActions.logout);
  // pagination 相关状态与处理
  const allowPagination = useStore((state) => state.table.pagination.allowPagination);
  const setPagination = useStore((state) => state.tableActions.setAllowPagination);
  const rowsPerPage = useStore((state) => state.table.pagination.rowsPerPage);
  const setRowsPerPage = useStore((state) => state.tableActions.setRowsPerPage);
  // layout 相关状态与处理
  const [location985BarChartLayoutVisible, setLocation985BarChartLayoutVisible] = useState(false);
  const location985BarChartLayout = useStore((state) => state.charts.location985.bar.layout);
  const setLocation985BarChartLayout = useStore(
    (state) => state.chartsActions.setLocation985BarChartLayout
  );
  const [location211BarChartLayoutVisible, setLocation211BarChartLayoutVisible] = useState(false);
  const location211BarChartLayout = useStore((state) => state.charts.location211.bar.layout);
  const setLocation211BarChartLayout = useStore(
    (state) => state.chartsActions.setLocation211BarChartLayout
  );
  const [locationDoubleTopsBarChartLayoutVisible, setLocationDoubleTopsBarChartLayoutVisible] =
    useState(false);
  const locationDoubleTopsBarChartLayout = useStore(
    (state) => state.charts.locationDoubleTops.bar.layout
  );
  const setLocationDoubleTopsBarChartLayout = useStore(
    (state) => state.chartsActions.setLocationDoubleTopsBarChartLayout
  );

  // 实现 store 里状态与展示中文的对应
  const barChartLayoutStateToText = {
    [CHARTS.LAYOUT.ASCENDING.STATE]: CHARTS.LAYOUT.ASCENDING.TEXT,
    [CHARTS.LAYOUT.DESCENDING.STATE]: CHARTS.LAYOUT.DESCENDING.TEXT,
    [CHARTS.LAYOUT.DEFAULT.STATE]: CHARTS.LAYOUT.DEFAULT.TEXT,
  };

  // 布局选择的 action, 也为静态
  const barChartLayoutActions = [
    { name: CHARTS.LAYOUT.ASCENDING.TEXT },
    { name: CHARTS.LAYOUT.DESCENDING.TEXT },
    { name: CHARTS.LAYOUT.DEFAULT.TEXT },
  ];

  // 得到根据当前选择后的 action 对应的 state
  const getSelectBarChartLayoutStateFromAction = (action) => {
    // 将 text 和 state 反过来
    // https://stackoverflow.com/a/56781239/12733140
    const barChartLayoutTextToState = Object.fromEntries(
      Object.entries(barChartLayoutStateToText).map(([k, v]) => [v, k])
    );
    const state = barChartLayoutTextToState[action.name];
    return state;
  };

  return (
    <div>
      <NavBar safeAreaInsetTop title="设置" leftArrow={false} />
      <Cell.Group border={false} title="登录设置">
        <Cell border={false} center title="登录时记住秘钥">
          <Switch
            size={24}
            checked={rememberToken}
            onChange={(changedValue) => {
              setRememberToken(changedValue);
              setPersistAuth(changedValue);
            }}
          />
        </Cell>
      </Cell.Group>

      <Divider className="divider-no-margin" />

      <Cell.Group border={false} title="表格">
        <Cell border={false} center title="显示分页">
          <Switch
            size={24}
            checked={allowPagination}
            onChange={(changedValue) => {
              setPagination(changedValue);
            }}
          />
        </Cell>

        <Cell border={false} center title="每页展示条目量">
          <Stepper
            value={rowsPerPage}
            min={5}
            max={20}
            step={5}
            onChange={(value) => {
              setRowsPerPage(value);
            }}
          />
        </Cell>
      </Cell.Group>

      <Divider className="divider-no-margin" />

      <Cell.Group border={false} title="图表">
        <Cell
          onClick={() => {
            setLocation985BarChartLayoutVisible(true);
          }}
          border={false}
          isLink
          title="985高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location985BarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={location985BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            setLocation985BarChartLayout(newLayoutState);
            setLocation985BarChartLayoutVisible(false);
          }}
          onCancel={() => {
            setLocation985BarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />

        <Cell
          onClick={() => {
            setLocation211BarChartLayoutVisible(true);
          }}
          border={false}
          isLink
          title="211高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location211BarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={location211BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            setLocation211BarChartLayout(newLayoutState);
            setLocation211BarChartLayoutVisible(false);
          }}
          onCancel={() => {
            setLocation211BarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />

        <Cell
          onClick={() => {
            setLocationDoubleTopsBarChartLayoutVisible(true);
          }}
          border={false}
          isLink
          title="双一流高校地区柱状图排序方式"
          value={barChartLayoutStateToText[locationDoubleTopsBarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={locationDoubleTopsBarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            setLocationDoubleTopsBarChartLayout(newLayoutState);
            setLocationDoubleTopsBarChartLayoutVisible(false);
          }}
          onCancel={() => {
            setLocationDoubleTopsBarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />
      </Cell.Group>

      <div className="settings-footer">
        <Button
          type="primary"
          block
          round
          onClick={() => {
            Dialog.confirm({
              title: '温馨提示',
              message: '您确定要登出吗?',
            })
              .then(() => {
                logout();
                // 需要移除持久化 auth
                removePersistAuth();
                navigate('/login', { replace: true });
              })
              .catch(() => {
                // 不登出
              });
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
