import React from 'react';
import { Tabs, IndexBar, Cell, NavBar, Tag, Flex } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { referenceTagOptions, referenceInfoOptions } from '../../config/tableConfig';

import indexes from '../../data/indexes.json';
import rowData from '../../data/rowData.json';
import columnData from '../../data/columnData.json';

const useStyles = createUseStyles({
  indexBar: {
    marginBottom: '16px',
  },
});

export default function Reference() {
  const navigate = useNavigate();
  const { en: englishIndexes, zh: chineseIndexes, location: locationIndexes } = indexes;

  const classes = useStyles();

  return (
    <div>
      <NavBar safeAreaInsetTop title="索引" leftArrow={false} />
      <Tabs>
        <Tabs.TabPane title="地区">
          <IndexBar className={classes.indexBar} indexList={Object.keys(locationIndexes)}>
            {Object.entries(locationIndexes).map(([indexCharacter, uniChineseNames]) => (
              <div key={indexCharacter}>
                <IndexBar.Anchor index={indexCharacter} />
                {uniChineseNames.map((uniChineseName) => {
                  // 这里 id 暂且使用每个大学在数据列表里的索引, 由于存在部分学校标识码没有的原因
                  const id = rowData.findIndex((row) => row[0] === uniChineseName).toString();
                  return (
                    <Cell
                      center
                      onClick={() => {
                        navigate(id);
                      }}
                      key={uniChineseName}
                      isLink
                      title={uniChineseName}
                      label={
                        <div>
                          <div style={{ marginBottom: '4px' }}>
                            {referenceInfoOptions
                              .map(({ indexValue }) => rowData[id][indexValue])
                              .join(' / ')}
                          </div>
                          <Flex justify="start" gutter={4}>
                            {referenceTagOptions.map(({ type, indexValue }) => {
                              return rowData[id][indexValue] === '是' ? (
                                <Flex.Item key={indexValue}>
                                  <Tag type={type}>{columnData[indexValue]}</Tag>
                                </Flex.Item>
                              ) : null;
                            })}
                          </Flex>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            ))}
          </IndexBar>
        </Tabs.TabPane>

        <Tabs.TabPane title="高校中文名稱">
          <IndexBar className={classes.indexBar} indexList={Object.keys(chineseIndexes)}>
            {Object.entries(chineseIndexes).map(([indexCharacter, uniChineseNames]) => (
              <div key={indexCharacter}>
                <IndexBar.Anchor index={indexCharacter} />
                {uniChineseNames.map((uniChineseName) => {
                  const id = rowData.findIndex((row) => row[0] === uniChineseName).toString();

                  return (
                    <Cell
                      center
                      onClick={() => {
                        // 这里 id 暂且使用每个大学在数据列表里的索引, 由于存在部分学校标识码没有的原因
                        navigate(id);
                      }}
                      key={uniChineseName}
                      isLink
                      title={uniChineseName}
                      label={
                        <div>
                          <div style={{ marginBottom: '4px' }}>
                            {referenceInfoOptions
                              .map(({ indexValue }) => rowData[id][indexValue])
                              .join(' / ')}
                          </div>
                          <Flex justify="start" gutter={4}>
                            {referenceTagOptions.map(({ type, indexValue }) => {
                              return rowData[id][indexValue] === '是' ? (
                                <Flex.Item key={indexValue}>
                                  <Tag type={type}>{columnData[indexValue]}</Tag>
                                </Flex.Item>
                              ) : null;
                            })}
                          </Flex>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            ))}
          </IndexBar>
        </Tabs.TabPane>

        <Tabs.TabPane title="高校英文名稱">
          <IndexBar className={classes.indexBar} indexList={Object.keys(englishIndexes)}>
            {Object.entries(englishIndexes).map(([indexCharacter, uniEnglishNames]) => (
              <div key={indexCharacter}>
                <IndexBar.Anchor index={indexCharacter} />
                {uniEnglishNames.map((uniEnglishName) => {
                  // 这里 id 暂且使用每个大学在数据列表里的索引, 由于存在部分学校标识码没有的原因
                  const id = rowData.findIndex((row) => row[1] === uniEnglishName).toString();

                  return (
                    <Cell
                      center
                      onClick={() => {
                        navigate(id);
                      }}
                      key={uniEnglishName}
                      isLink
                      title={uniEnglishName}
                      label={
                        <div>
                          <div style={{ marginBottom: '4px' }}>
                            {referenceInfoOptions
                              .map(({ indexValue }) => rowData[id][indexValue])
                              .join(' / ')}
                          </div>
                          <Flex justify="start" gutter={4}>
                            {referenceTagOptions.map(({ type, indexValue }) => {
                              return rowData[id][indexValue] === '是' ? (
                                <Flex.Item key={indexValue}>
                                  <Tag type={type}>{columnData[indexValue]}</Tag>
                                </Flex.Item>
                              ) : null;
                            })}
                          </Flex>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            ))}
          </IndexBar>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
