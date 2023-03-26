import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Cell, Switch, Button, Dialog, Stepper, ActionSheet, Toast } from 'react-vant';
import { LocalStorageService } from '../../services';
import { CHARTS, LANGUAGES } from '../../constants/store';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = createUseStyles({
  footer: {
    padding: '20px',
  },
});

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authed = useSelector((state) => state.auth.authed);
  // auth 相关状态与处理
  const [rememberToken, setRememberToken] = useState(LocalStorageService.getPersistAuth());
  // 多语言
  const language = useSelector((state) => state.i18n.language);
  // 主题
  const darkMode = useSelector((state) => state.theme.darkMode);
  const autoTheme = useSelector((state) => state.theme.auto);
  // 表格数据展示
  const showInvalidData = useSelector((state) => state.table.tableData.showInvalidData);
  const showDoubleTops2017Data = useSelector(
    (state) => state.table.tableData.showDoubleTops2017Data
  );
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
  // 格式为 { ascending: 升序, descending: 降序, default: 默认 }
  const barChartLayoutStateToText = useMemo(
    () =>
      Object.entries(CHARTS.LAYOUT).reduce((result, [k, v]) => {
        result[v.STATE] = v.TEXT;
        return result;
      }, {}),
    []
  );

  // barChart actionSheet 模板, 同时根据当前图标状态标记选项
  // 格式为 [{ name: 升序 }, { name: 降序 }, { name: 默认, color: #ee0a24 }]
  const getBarChartLayoutActionsWithState = (state) => {
    return Object.entries(CHARTS.LAYOUT).reduce((result, [k, v]) => {
      if (v.STATE === state) {
        // 当前图标状态标记为红色
        result.push({
          name: v.TEXT,
          color: '#ee0a24',
        });
      } else {
        result.push({
          name: v.TEXT,
        });
      }
      return result;
    }, []);
  };

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

  // 当前语言
  const currentLanguage = useMemo(
    () => Object.values(LANGUAGES).filter(({ STATE, TEXT }) => STATE === language)[0]['TEXT'],
    [language]
  );

  // 无需验证即能进行的设置
  const sharedSettings = (
    <>
      <Cell.Group title="通用">
        <Cell
          title="多语言"
          isLink
          value={currentLanguage}
          onClick={() => {
            navigate('languages');
          }}
        />
      </Cell.Group>

      <Cell.Group title="主题">
        <Cell center title="跟随系统" label="跟随系统主题自动切换">
          <Switch
            size={24}
            checked={autoTheme}
            onChange={(changedValue) => {
              dispatch.theme.setAuto(changedValue);
            }}
          />
        </Cell>
        {autoTheme ? null : (
          <Cell center title="黑暗模式" label="开启可切换为黑暗模式">
            <Switch
              size={24}
              checked={darkMode}
              onChange={(changedValue) => {
                dispatch.theme.setDarkMode(changedValue);
              }}
            />
          </Cell>
        )}
      </Cell.Group>
    </>
  );

  if (!authed) {
    return (
      <div>
        <NavBar safeAreaInsetTop title="设置" leftArrow={false} />
        {sharedSettings}
      </div>
    );
  }

  return (
    <div>
      <NavBar safeAreaInsetTop title="设置" leftArrow={false} />
      <Cell.Group title="登录">
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

      {sharedSettings}

      <Cell.Group title="表格">
        <Cell center title="显示无效数据">
          <Switch
            size={24}
            checked={showInvalidData}
            onChange={(changedValue) => {
              dispatch.table.toggleInvalidData(changedValue);
            }}
          />
        </Cell>

        <Cell center title="显示2017双一流数据">
          <Switch
            size={24}
            checked={showDoubleTops2017Data}
            onChange={(changedValue) => {
              dispatch.table.toggleDoubleTops2017Data(changedValue);
            }}
          />
        </Cell>

        <Cell center title="显示分页">
          <Switch
            size={24}
            checked={allowPagination}
            onChange={(changedValue) => {
              dispatch.table.setAllowPagination(changedValue);
            }}
          />
        </Cell>

        <Cell center title="每页展示条目量">
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

        <Cell
          center
          title="预览新数据"
          isLink
          label="上传并预览新数据"
          onClick={() => {
            navigate('upload');
          }}
        />
      </Cell.Group>

      <Cell.Group title="小助手">
        <Cell
          isLink
          title="配置"
          value={LocalStorageService.getAPIKey() ? '已配置' : '未配置'}
          onClick={() => {
            navigate('assistant-key');
          }}
        />
      </Cell.Group>

      <Cell.Group title="图表">
        <Cell
          center
          onClick={() => {
            setLocation985BarChartLayoutVisible(true);
          }}
          isLink
          title="985高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location985BarChartLayout]}
        />
        <ActionSheet
          description="985高校地区柱状图排序方式"
          actions={getBarChartLayoutActionsWithState(location985BarChartLayout)}
          visible={location985BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocation985BarChartLayout(newLayoutState);
            setLocation985BarChartLayoutVisible(false);
            Toast.success({
              message: '设置成功',
            });
          }}
          onCancel={() => {
            setLocation985BarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />

        <Cell
          center
          onClick={() => {
            setLocation211BarChartLayoutVisible(true);
          }}
          isLink
          title="211高校地区柱状图排序方式"
          value={barChartLayoutStateToText[location211BarChartLayout]}
        />
        <ActionSheet
          description="211高校地区柱状图排序方式"
          actions={getBarChartLayoutActionsWithState(location211BarChartLayout)}
          visible={location211BarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocation211BarChartLayout(newLayoutState);
            setLocation211BarChartLayoutVisible(false);
            Toast.success({
              message: '设置成功',
            });
          }}
          onCancel={() => {
            setLocation211BarChartLayoutVisible(false);
          }}
          cancelText="取消"
        />

        <Cell
          center
          onClick={() => {
            setLocationDoubleTopsBarChartLayoutVisible(true);
          }}
          isLink
          title="双一流高校地区柱状图排序方式"
          value={barChartLayoutStateToText[locationDoubleTopsBarChartLayout]}
        />
        <ActionSheet
          description="双一流高校地区柱状图排序方式"
          actions={getBarChartLayoutActionsWithState(locationDoubleTopsBarChartLayout)}
          visible={locationDoubleTopsBarChartLayoutVisible}
          onSelect={(action, index) => {
            const newLayoutState = getSelectBarChartLayoutStateFromAction(action, index);
            dispatch.charts.setLocationDoubleTopsBarChartLayout(newLayoutState);
            setLocationDoubleTopsBarChartLayoutVisible(false);
            Toast.success({
              message: '设置成功',
            });
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
