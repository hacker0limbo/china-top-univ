import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Cell, Switch, Button, Dialog, Stepper, ActionSheet } from 'react-vant';
import { LocalStorageService } from '../services'
import { CHARTS } from '../constants/store';
import { createUseStyles } from 'react-jss'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = createUseStyles({
  footer: {
    padding: '20px'
  }
})

export default function Settings() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // auth 相关状态与处理
  const [rememberToken, setRememberToken] = useState(LocalStorageService.getPersistAuth());
  // pagination 相关状态与处理
  const allowPagination = useSelector((state) => state.table.pagination.allowPagination);
  const rowsPerPage = useSelector((state) => state.table.pagination.rowsPerPage);
  // layout 相关状态与处理
  const [location985BarChartLayoutVisible, setLocation985BarChartLayoutVisible] = useState(false);
  const location985BarChartLayout = useSelector((state) => state.charts.location985.bar.layout);
  const [location211BarChartLayoutVisible, setLocation211BarChartLayoutVisible] = useState(false);
  const location211BarChartLayout = useSelector((state) => state.charts.location211.bar.layout);
  const [locationDoubleTopsBarChartLayoutVisible, setLocationDoubleTopsBarChartLayoutVisible] =
    useState(false);
  const locationDoubleTopsBarChartLayout = useSelector(
    (state) => state.charts.locationDoubleTops.bar.layout
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
      <Cell.Group title="登录设置">
        <Cell center title="登录时记住秘钥">
          <Switch
            size={24}
            checked={rememberToken}
            onChange={(changedValue) => {
              setRememberToken(changedValue);
              LocalStorageService.setPersistAuth(changedValue);
            }}
          />
        </Cell>
      </Cell.Group>

      <Cell.Group  title="表格">
        <Cell center title="显示分页">
          <Switch
            size={24}
            checked={allowPagination}
            onChange={(changedValue) => {
              dispatch.table.setAllowPagination(changedValue);
            }}
          />
        </Cell>

        <Cell  center title="每页展示条目量">
          <Stepper
            value={rowsPerPage}
            min={5}
            max={20}
            step={5}
            onChange={(value) => {
              dispatch.table.setRowsPerPage(value);
            }}
          />
        </Cell>
      </Cell.Group>

      <Cell.Group title="图表">
        <Cell
          onClick={() => {
            setLocation985BarChartLayoutVisible(true);
          }}
          isLink
          title="985高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location985BarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={location985BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocation985BarChartLayout(newLayoutState);
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
          isLink
          title="211高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location211BarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={location211BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocation211BarChartLayout(newLayoutState);
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
          isLink
          title="双一流高校地区柱状图排序方式"
          value={barChartLayoutStateToText[locationDoubleTopsBarChartLayout]}
        />
        <ActionSheet
          actions={[...barChartLayoutActions]}
          visible={locationDoubleTopsBarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocationDoubleTopsBarChartLayout(newLayoutState);
            setLocationDoubleTopsBarChartLayoutVisible(false);
          }}
          onCancel={() => {
            setLocationDoubleTopsBarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />
      </Cell.Group>

      <div className={classes.footer}>
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
                dispatch.auth.logout();
                // 需要移除持久化 auth
                LocalStorageService.removePersistAuth();
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
