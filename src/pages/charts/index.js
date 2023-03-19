import React from 'react';
import { NavBar, Cell } from 'react-vant';
import { useNavigate } from 'react-router-dom';

export default function Charts() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar safeAreaInsetTop title="图表" leftArrow={false} />
      <Cell.Group title="地区">
        <Cell
          center
          title="高校地区分布图"
          isLink
          onClick={() => {
            navigate('/charts/location');
          }}
        />
      </Cell.Group>
      <Cell.Group title="建校时间">
        <Cell
          center
          title="建校时间柱状折线图"
          isLink
          onClick={() => {
            navigate('/charts/establishment');
          }}
        />
      </Cell.Group>
    </div>
  );
}
