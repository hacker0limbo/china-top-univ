import React from 'react';
import { NavBar, Cell } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import packageInfo from '../../../package.json';

const useStyles = createUseStyles({
  body: {
    marginBottom: '20px',
  },
});

export default function Technology() {
  const { dependencies } = packageInfo;
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="技术框架"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      <div className={classes.body}>
        <Cell.Group inset title="前端">
          <Cell center title="React" value={dependencies.react} label="前端框架" />
          <Cell
            center
            title="React-Redux"
            value={dependencies['react-redux']}
            label="React 状态管理库"
          />
          <Cell
            center
            title="Rematch"
            value={dependencies['@rematch/core']}
            label="基于 Redux 的状态管理"
          />
          <Cell
            center
            title="React-Router"
            value={dependencies['react-router-dom']}
            label="React 路由"
          />
          <Cell
            center
            title="React-Vant"
            value={dependencies['react-vant']}
            label="React 移动端组件库"
          />
          <Cell center title="React-JSS" value={dependencies['react-jss']} label="React 样式库" />
          <Cell center title="Echarts" value={dependencies['echarts']} label="图表可视化库" />
        </Cell.Group>

        <Cell.Group inset title="数据处理">
          <Cell center title="CSV-Parse" value={dependencies['csv-parse']} label="读取和操作 csv" />
          <Cell center title="pinyin" value={dependencies.pinyin} label="拼音库" />
        </Cell.Group>

        <Cell.Group inset title="部署">
          <Cell center title="gh-pages" value={dependencies['gh-pages']} label="部署在 GitHub" />
        </Cell.Group>
      </div>
    </div>
  );
}
