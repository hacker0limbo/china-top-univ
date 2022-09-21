import React from 'react';
import { NavBar, Typography } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import updateData from '../../data/updateData.json';

const useStyles = createUseStyles({
  updateLogsBody: {
    margin: '0 20px 20px 20px',
    '& li': {
      listStyle: 'circle',
      marginLeft: '30px',
    },
    // 覆盖 react-vant 默认 Typography.Text 的 display: inline-block 
    '& .rv-typography--text': {
      display: 'block',
    },
  },
});

export default function UpdateLogs() {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="更新日志"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      <Typography.Title level={2} center>
        更新日志
      </Typography.Title>
      {updateData.map(([title, logs], index) => (
        <div key={index} className={classes.updateLogsBody}>
          <Typography.Title level={4}>{title}</Typography.Title>
          <ul>
            {logs.split('；').map((log, i) => (
              <li key={i}>
                <Typography.Text>{log}</Typography.Text>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
