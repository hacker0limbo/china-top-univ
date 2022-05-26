import React from 'react';
import { NavBar, Cell, Divider } from 'react-vant';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar safeAreaInsetTop title="关于" leftArrow={false} />
      <Cell.Group title="项目组成员" border={false}>
        <Cell
          border={false}
          title="平臺製作"
          isLink
          value="Limboer"
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo';
          }}
        />
        <Cell
          border={false}
          title="數據整理"
          isLink
          value="ikimsam"
          onClick={() => {
            document.location.href = 'http://ikimsam.me';
          }}
        />
      </Cell.Group>

      <Divider className="divider-no-margin" />

      <Cell.Group title="项目信息" border={false}>
        <Cell
          border={false}
          title="项目源码"
          isLink
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo/china-top-univ';
          }}
        />
        <Cell
          border={false}
          title="更新日志"
          isLink
          onClick={() => {
            navigate('./update-logs')
          }}
        />
      </Cell.Group>

      <Divider className="divider-no-margin" />

      <Cell.Group title="开原许可" border={false}>
        <Cell
          border={false}
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
