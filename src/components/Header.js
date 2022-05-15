import React from 'react';
import { Typography, Flex } from 'react-vant';
import titleData from '../data/titleData.json';

export default function Header() {
  const [titleName, updateDate] = titleData;

  return (
    <div className="header">
      <Flex direction="column" align="center">
        <Typography.Title level={2}>{titleName}</Typography.Title>
        <Typography.Title level={4}>{updateDate}</Typography.Title>
        <Flex direction="row" justify="center">
          <Flex.Item span={8}>
            <Typography.Text strong>平臺製作：</Typography.Text>
          </Flex.Item>
          <Flex.Item span={8}>
            <Typography.Link
              onClick={() => {
                document.location.href = 'https://github.com/hacker0limbo';
              }}
              strong
            >
              Limboer
            </Typography.Link>
          </Flex.Item>
          <Flex.Item span={8}>
            <Typography.Text strong>數據整理：</Typography.Text>
          </Flex.Item>
          <Flex.Item span={8}>
            <Typography.Link
              onClick={() => {
                document.location.href = 'http://ikimsam.me';
              }}
              strong
            >
              ikimsam
            </Typography.Link>
          </Flex.Item>
        </Flex>
        <hr width="80%" />
      </Flex>
    </div>
  );
}
