import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cell, NavBar, Empty } from 'react-vant';
import { createUseStyles } from 'react-jss';

import rowData from '../../data/rowData.json';
import columnData from '../../data/columnData.json';

const useStyles = createUseStyles({
  infoCard: {
    margin: '16px 0',
  },
});

export default function UniversityInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const uniInfo = rowData[id];

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title={uniInfo && uniInfo[0]}
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      {uniInfo ? (
        <Cell.Group inset className={classes.infoCard}>
          {uniInfo.map((info, i) => (
            <Cell
              border={[2, 8, 16, 20].includes(i) ? true : false}
              key={i}
              title={columnData[i]}
              value={info}
            />
          ))}
        </Cell.Group>
      ) : (
        <Empty description="查无此校" />
      )}
    </div>
  );
}
