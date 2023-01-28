import React from 'react';
import { Button, Empty } from 'react-vant';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  return (
    <Empty image="error" description="您访问的页面不存在">
      <Button
        style={{ width: 160 }}
        round
        type="primary"
        onClick={() => {
          navigate('/');
        }}
      >
        回到首页
      </Button>
    </Empty>
  );
}
