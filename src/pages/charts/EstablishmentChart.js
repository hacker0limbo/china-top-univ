import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'react-vant';
import { useIsDarkTheme } from '../../hooks/useIsDarkTheme';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { themeVars } from '../../theme';
import { establishmentData } from '../../config/chartConfig';

// Register the required components
echarts.use([
  LineChart,
  BarChart,
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

export default function EstablishmentChart() {
  const navigate = useNavigate();
  const isDarkTheme = useIsDarkTheme();
  const echartRef = useRef();
  const seriesData = useMemo(
    () =>
      establishmentData.map((v) => ({
        ...v,
        type: 'bar',
        label: { show: true, position: 'top' },
      })),
    []
  );

  const option = {
    title: {},
    legend: [
      {
        data: establishmentData.slice(0, 2).map((v) => v.name),
        left: '4%',
        selected: {
          所有高校: true,
          '985高校': false,
        },
      },
      {
        data: establishmentData.slice(2, 4).map((v) => v.name),
        top: '8%',
        left: '4%',
        selected: {
          '211高校': false,
          双一流高校: false,
        },
      },
    ],
    tooltip: {
      valueFormatter: (value) => {
        return `${value}所`;
      },
    },
    grid: {
      // bottom: '35%',
    },
    backgroundColor: isDarkTheme
      ? themeVars.dark['background-color']
      : themeVars.light['background-color'],
    xAxis: {
      nameGap: 3,
      // name: '建校',
      type: 'category',
    },
    yAxis: {
      // name: '数量',
      type: 'value',
    },
    dataZoom: [
      {
        type: 'inside',
        start: 40,
        end: 60,
      },
      {
        type: 'slider',
        // top: '75%',
        start: 40,
        end: 60,
      },
    ],
    toolbox: {
      // itemSize: 30,
      // itemGap: 16,
      // left: 'center',
      // top: 'bottom',
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        magicType: {
          show: true,
          type: ['line', 'bar'],
        },
        dataView: {},
        restore: {},
        saveAsImage: {},
      },
    },
    series: seriesData,
  };

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="建校时间柱状图"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      <ReactEChartsCore
        style={{ marginTop: '10vh' }}
        ref={(e) => {
          echartRef.current = e;
        }}
        echarts={echarts}
        option={option}
        opts={{
          // height: '350',
          locale: 'ZH',
        }}
        notMerge
        lazyUpdate
        theme={isDarkTheme ? 'dark' : 'light'}
        onEvents={{
          click: (params) => {
            const years = establishmentData
              .filter((d) => d.name === params.seriesName)[0]
              .data.map((v) => v[0]);
            const zoomSize = 6;
            if (echartRef.current) {
              echartRef.current.getEchartsInstance().dispatchAction({
                type: 'dataZoom',
                startValue: years[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue:
                  years[
                    Math.min(
                      params.dataIndex + zoomSize / 2,
                      establishmentData.filter((v) => v.name === params.seriesName)[0].data.length -
                        1
                    )
                  ],
              });
            }
          },
          legendselectchanged: ({ type, name, selected }) => {
            // 点击上面图例触发的事件, 保证每次点击只展示一种图例
            // 使用 dispatchAction 而不是直接在 options 里设置 selected 状态
            if (echartRef.current) {
              establishmentData.forEach((d) => {
                echartRef.current.getEchartsInstance().dispatchAction({
                  type: d.name === name ? 'legendSelect' : 'legendUnSelect',
                  name: d.name,
                });
              });
            }
          },
        }}
      />
    </div>
  );
}
