import React from 'react';
import { NavBar, Cell } from 'react-vant';

export default function About() {
  return (
    <div>
      <NavBar safeAreaInsetTop title="关于" leftArrow={false} />
      <Cell.Group border={false} title="项目组成员">
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
      <Cell.Group border={false} title="项目信息">
        <Cell
          title="项目源码"
          isLink
          value=""
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo/china-top-univ';
          }}
        />
      </Cell.Group>
    </div>
  );
}
