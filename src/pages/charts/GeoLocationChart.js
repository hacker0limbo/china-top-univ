import React, { useRef, useEffect, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, MapChart } from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useIsDarkTheme } from '../../hooks/useIsDarkTheme';
import map from '../../data/map.json';
import { NavBar } from 'react-vant';
import { useNavigate } from 'react-router-dom';

// https://www.jianshu.com/p/29b346e282ac

// Register the required components
echarts.use([
  MapChart,
  LineChart,
  BarChart,
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer,
  VisualMapComponent,
]);

// 地图: https://datav.aliyun.com/portal/school/atlas/area_selector
echarts.registerMap('china', map);

export default function GeoLocation() {
  const navigate = useNavigate();
  const isDarkTheme = useIsDarkTheme();
  const echartRef = useRef();

  const option = {
    title: {},
    legend: {},
    tooltip: {},
    toolbox: {
      feature: {
        dataView: {},
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: [
      {
        // 视觉映射效果为连续性
        type: 'continuous',
        left: 'right',
        min: 0,
        max: 30,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered'],
        },
        text: ['多', '少'],
        calculable: true,
      },
    ],
    // 使用 geo 统一配置地图样式
    geo: {
      map: 'china',
      top: 100,
      zoom: 1.5,
      // 是否开启鼠标缩放和平移漫游
      roam: true,
      // 显示省名字
      label: {
        show: true,
        fontSize: 5,
      },
    },
    series: [
      {
        name: '高校地区数量',
        type: 'map',
        // map: 'china',
        geoIndex: 0,
        data: [
          { name: '北京市', value: 1 },
          {
            name: '天津市',
            value: 25,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="高校地区分布图"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />

      <ReactEChartsCore
        style={{ marginTop: '10vw' }}
        ref={(e) => {
          echartRef.current = e;
        }}
        echarts={echarts}
        option={option}
        opts={{
          locale: 'ZH',
        }}
        notMerge
        lazyUpdate
        theme={isDarkTheme ? 'dark' : 'light'}
        onEvents={{
          click: (params) => {},
        }}
      />
    </div>
  );
}
