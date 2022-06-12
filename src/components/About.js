import React from 'react';
import { NavBar, Cell } from 'react-vant';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar safeAreaInsetTop title="关于" leftArrow={false} />
      <Cell.Group title="项目组成员">
        <Cell
          title="平臺製作"
          isLink
          value="Limboer"
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo';
          }}
        />
        <Cell
          title="數據整理"
          isLink
          value="ikimsam"
          onClick={() => {
            document.location.href = 'http://ikimsam.me';
          }}
        />
      </Cell.Group>

      <Cell.Group title="项目信息">
        <Cell
          title="项目源码"
          isLink
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo/china-top-univ';
          }}
        />
        <Cell
          title="更新日志"
          isLink
          onClick={() => {
            navigate('./update-logs');
          }}
        />
      </Cell.Group>

      <Cell.Group title="开原许可">
        <Cell
          title="免责声明"
          isLink
          onClick={() => {
            navigate('./disclaimer');
          }}
        />
      </Cell.Group>
    </div>
  );
}
