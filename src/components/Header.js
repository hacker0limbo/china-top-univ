import React from 'react';
import { Typography, Flex } from 'react-vant';

export default function Header() {
  return (
    <div className='header'>
      <Flex direction="column" align="center">
        <Typography.Title level={2}>中國一流高校（大陸地區）名單</Typography.Title>
        <Typography.Title level={5}>（更新日期：2022 年 5 月 5 日）</Typography.Title>
      </Flex>
    </div>
  );
}
