import React from 'react';
import { NavBar, Typography } from 'react-vant';
import { useNavigate } from 'react-router-dom';

import disclaimerData from '../data/disclaimerData.json';

// 免责声明
export default function Disclaimer() {
  const navigate = useNavigate();

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
      <ol className="about-disclaimer-body">
        {disclaimerData.map((v, i) => (
          <li key={i}>
            <Typography.Text>{v}</Typography.Text>
          </li>
        ))}
      </ol>
    </div>
  );
}
