import React from 'react';
import { NavBar, Typography } from 'react-vant';
import { useNavigate } from 'react-router-dom';

import updateData from '../data/updateData.json';

export default function UpdateLogs() {
  const navigate = useNavigate();

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
        <div key={index} className="about-updates-section">
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
