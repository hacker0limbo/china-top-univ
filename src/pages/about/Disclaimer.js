import React from 'react';
import { NavBar, Typography } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import disclaimerData from '../../data/disclaimerData.json';

const useStyles = createUseStyles({
  disclaimerBody: {
    margin: '0 20px 20px 20px',
    '& li': {
      listStyle: 'circle',
      marginLeft: '20px',
      marginBottom: '10px',
    },
    // 覆盖 react-vant 默认 Typography.Text 的 display: inline-block
    '& .rv-typography--text': {
      display: 'block',
    },
  },
});

// 免责声明
export default function Disclaimer() {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="免责声明"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      <Typography.Title level={2} center>
        免责声明
      </Typography.Title>
      <ol className={classes.disclaimerBody}>
        {disclaimerData.map((v, i) => (
          <li key={i}>
            <Typography.Text>{v}</Typography.Text>
          </li>
        ))}
      </ol>
    </div>
  );
}
