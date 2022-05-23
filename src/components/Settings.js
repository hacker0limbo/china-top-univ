import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Cell, Switch, Button, Dialog, Divider, Stepper, ActionSheet } from 'react-vant';
import useStore from '../store';
import { setPersistAuth, getPersistAuth, removePersistAuth } from '../utils';

export default function Settings() {
  const navigate = useNavigate();
  const [rememberToken, setRememberToken] = useState(getPersistAuth());
  const [location985BarChartLayoutVisible, setLocation985BarChartLayoutVisible] = useState(false);
  const logout = useStore((state) => state.logout);
  const allowPagination = useStore((state) => state.allowPagination);
  const setPagination = useStore((state) => state.setPagination);
  const rowsPerPage = useStore((state) => state.rowsPerPage);
  const setRowsPerPage = useStore((state) => state.setRowsPerPage);
  const location985BarChartLayout = useStore((state) => state.charts.location985.bar.layout);
  const setLocation985BarChartLayout = useStore(
    (state) => state.chartsActions.setLocation985BarChartLayout
  );

  const location985BarChartLayoutText = useMemo(() => {
    if (location985BarChartLayout === 'ascending') {
      return '升序';
    } else if (location985BarChartLayout === 'descending') {
      return '降序';
    } else {
      return '默认';
    }
  }, [location985BarChartLayout]);

  const barChartLayoutActions = [{ name: '升序' }, { name: '降序' }, { name: '默认' }];

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
          value={location985BarChartLayoutText}
        />
        <ActionSheet
          actions={barChartLayoutActions}
          visible={location985BarChartLayoutVisible}
          onSelect={(action, index) => {
            if (action.name === '升序') {
              setLocation985BarChartLayout('ascending');
            } else if (action.name === '降序') {
              setLocation985BarChartLayout('descending');
            } else {
              setLocation985BarChartLayout('default');
            }
            setLocation985BarChartLayoutVisible(false);
          }}
          onCancel={() => {
            setLocation985BarChartLayoutVisible(false);
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
