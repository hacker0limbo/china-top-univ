import React from 'react';
import { NavBar, Tabs, Typography } from 'react-vant';
import Canvas from '@antv/f2-react';
import { Chart, Interval, Axis, TextGuide, ScrollBar, PieLabel } from '@antv/f2';

import locationData from '../data/locationData.json';

export default function UniversityTable() {
  const {
    211: location211Data,
    985: location985Data,
    doubleTops: locationDoubleTopsData,
  } = locationData;

  return (
    <div>
      <NavBar safeAreaInsetTop title="图表" leftArrow={false} />
      <Tabs active={0} sticky>
        <Tabs.TabPane title="985">
          <Typography.Title center level={4} className="univ-charts-title">
            985高校地区分布柱状图
          </Typography.Title>
          <Canvas>
            <Chart data={location985Data.bar} scale={{ count: { max: 10, tickCount: 6 } }}>
              <Axis field="location" />
              <Axis field="count" />
              <Interval x="location" y="count" color="location" />
              {location985Data.bar.map((item) => (
                <TextGuide
                  key={item.location}
                  records={[item]}
                  content={`${item.count}`}
                  attrs={{ fill: '#000', fontSize: '24px' }}
                  offsetY={-10}
                  offsetX={-5}
                />
              ))}
              <ScrollBar mode="x" range={[0, 0.4]} />
            </Chart>
          </Canvas>

          <Typography.Title level={4} center className="univ-charts-title">
            985高校地区分布饼图
          </Typography.Title>
          <Canvas>
            <Chart
              data={location985Data.pie}
              coord={{
                type: 'polar',
                transposed: true,
                innerRadius: 0.3,
                radius: 0.6,
              }}
            >
              <Interval x="const" y="ratio" adjust="stack" color={{ field: 'location' }} />
              <PieLabel
                label1={(data) => {
                  return {
                    text: `${data.location}: ${(data.ratio * 100).toFixed(2)}%`,
                    fill: '#000000',
                  };
                }}
                label2={(data) => {
                  return {
                    fill: '#000000',
                    text: `${data.count} 所`,
                    fontWeight: 500,
                    fontSize: 10,
                  };
                }}
              />
            </Chart>
          </Canvas>
        </Tabs.TabPane>

        <Tabs.TabPane title="211">
          <Typography.Title level={4} center className="univ-charts-title">
            211高校地区分布柱状图
          </Typography.Title>
          <Canvas>
            <Chart data={location211Data.bar} scale={{ count: { tickCount: 6 } }}>
              <Axis field="location" />
              <Axis field="count" />
              <Interval x="location" y="count" color="location" />
              {location211Data.bar.map((item) => (
                <TextGuide
                  key={item.location}
                  records={[item]}
                  content={`${item.count}`}
                  attrs={{ fill: '#000', fontSize: '24px' }}
                  offsetY={-10}
                  offsetX={-5}
                />
              ))}
              <ScrollBar mode="x" range={[0, 0.4]} />
            </Chart>
          </Canvas>

          <Typography.Title level={4} center className="univ-charts-title">
            211高校地区分布饼图
          </Typography.Title>
          <Canvas>
            <Chart
              data={location211Data.pie}
              coord={{
                type: 'polar',
                transposed: true,
                innerRadius: 0.3,
                radius: 0.6,
              }}
            >
              <Interval x="const" y="ratio" adjust="stack" color={{ field: 'location' }} />
              <PieLabel
                label1={(data) => {
                  return {
                    text: `${data.location}: ${(data.ratio * 100).toFixed(2)}%`,
                    fill: '#000000',
                  };
                }}
                label2={(data) => {
                  return {
                    fill: '#000000',
                    text: `${data.count} 所`,
                    fontWeight: 500,
                    fontSize: 10,
                  };
                }}
              />
            </Chart>
          </Canvas>
        </Tabs.TabPane>

        <Tabs.TabPane title="2022双一流">
          <Typography.Title level={4} center className="univ-charts-title">
            双一流高校地区分布柱状图
          </Typography.Title>
          <Canvas>
            <Chart data={locationDoubleTopsData.bar} scale={{ count: { max: 40, tickCount: 6 } }}>
              <Axis field="location" />
              <Axis field="count" />
              <Interval x="location" y="count" color="location" />
              {locationDoubleTopsData.bar.map((item) => (
                <TextGuide
                  key={item.location}
                  records={[item]}
                  content={`${item.count}`}
                  attrs={{ fill: '#000', fontSize: '24px' }}
                  offsetY={-10}
                  offsetX={-5}
                />
              ))}
              <ScrollBar mode="x" range={[0, 0.4]} />
            </Chart>
          </Canvas>

          <Typography.Title level={4} center className="univ-charts-title">
            2022双一流高校地区分布饼图
          </Typography.Title>
          <Canvas>
            <Chart
              data={locationDoubleTopsData.pie}
              coord={{
                type: 'polar',
                transposed: true,
                innerRadius: 0.3,
                radius: 0.6,
              }}
            >
              <Interval x="const" y="ratio" adjust="stack" color={{ field: 'location' }} />
              <PieLabel
                label1={(data) => {
                  return {
                    text: `${data.location}: ${(data.ratio * 100).toFixed(2)}%`,
                    fill: '#000000',
                  };
                }}
                label2={(data) => {
                  return {
                    fill: '#000000',
                    text: `${data.count} 所`,
                    fontWeight: 500,
                    fontSize: 10,
                  };
                }}
              />
            </Chart>
          </Canvas>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
