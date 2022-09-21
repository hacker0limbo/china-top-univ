import React from 'react';
import { Tabs, IndexBar, Cell, NavBar } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import indexData from '../../data/indexData.json';
import rowData from '../../data/rowData.json';

const useStyles = createUseStyles({
  indexBar: {
    marginBottom: '16px',
  },
});

export default function Reference() {
  const navigate = useNavigate();
  const englishIndexes = Object.entries(indexData).filter(([k, { en, zh }]) => en.length > 0);
  const chineseIndexes = Object.entries(indexData).filter(([k, { en, zh }]) => zh.length > 0);

  const classes = useStyles();

  return (
    <div>
      <NavBar safeAreaInsetTop title="高校索引" leftArrow={false} />
      <Tabs>
        <Tabs.TabPane title="高校中文名稱">
          <IndexBar
            className={classes.indexBar}
            indexList={chineseIndexes.map(([indexCharacter]) => indexCharacter)}
          >
            {chineseIndexes.map(([indexCharacter, { en, zh }]) => (
              <div key={indexCharacter}>
                <IndexBar.Anchor index={indexCharacter} />
                {zh.map((uniChineseName) => (
                  <Cell
                    onClick={() => {
                      // 这里 id 暂且使用每个大学在数据列表里的索引, 由于存在部分学校标识码没有的原因
                      const id = rowData.findIndex((row) => row[0] === uniChineseName).toString();
                      navigate(id);
                    }}
                    key={uniChineseName}
                    isLink
                    title={uniChineseName}
                  />
                ))}
              </div>
            ))}
          </IndexBar>
        </Tabs.TabPane>

        <Tabs.TabPane title="高校英文名稱">
          <IndexBar
            className={classes.indexBar}
            indexList={englishIndexes.map(([indexCharacter]) => indexCharacter)}
          >
            {englishIndexes.map(([indexCharacter, { en, zh }]) => (
              <div key={indexCharacter}>
                <IndexBar.Anchor index={indexCharacter} />
                {en.map((uniEnglishName) => (
                  <Cell
                    onClick={() => {
                      // 这里 id 暂且使用每个大学在数据列表里的索引, 由于存在部分学校标识码没有的原因
                      const id = rowData.findIndex((row) => row[1] === uniEnglishName).toString();
                      navigate(id);
                    }}
                    key={uniEnglishName}
                    isLink
                    title={uniEnglishName}
                  />
                ))}
              </div>
            ))}
          </IndexBar>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
