import React, { useState } from 'react';
import { NavBar, Cell, ShareSheet, ImagePreview, Toast } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import websiteQRCode from '../../img/website-qrcode.png';

export default function About() {
  const navigate = useNavigate();
  const [shareSheetVisible, setShareSheetVisible] = useState(false);
  const authed = useSelector((state) => state.auth.authed);

  return (
    <div>
      <NavBar safeAreaInsetTop title="关于" leftArrow={false} />
      <Cell.Group title="项目组成员">
        <Cell
          title="平台制作"
          isLink
          value="Limboer"
          onClick={() => {
            document.location.href = 'https://github.com/hacker0limbo';
          }}
        />
        <Cell
          title="数据整理"
          isLink
          value="ikimsam"
          onClick={() => {
            document.location.href = 'http://ikimsam.me';
          }}
        />
      </Cell.Group>

      <Cell.Group title="项目信息">
        <Cell
          title="技术框架"
          isLink
          onClick={() => {
            navigate('technology');
          }}
        />
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
            navigate('update-logs');
          }}
        />
      </Cell.Group>

      <Cell.Group title="开原许可">
        <Cell
          title="免责声明"
          isLink
          onClick={() => {
            navigate('disclaimer');
          }}
        />
      </Cell.Group>

      <Cell.Group title="分享反馈">
        <Cell
          title="分享应用"
          isLink
          onClick={() => {
            setShareSheetVisible(true);
          }}
        />
        <Cell
          title="意见反馈"
          isLink
          onClick={() => {
            navigate('feedback');
          }}
        />
        {authed ? (
          <Cell
            title="小助手"
            isLink
            onClick={() => {
              navigate('assistant');
            }}
          />
        ) : null}

        <ShareSheet
          visible={shareSheetVisible}
          options={[
            { name: '微信', icon: 'wechat' },
            { name: '复制链接', icon: 'link' },
            { name: '二维码', icon: 'qrcode' },
          ]}
          title="立即分享给好友"
          onCancel={() => {
            setShareSheetVisible(false);
          }}
          onSelect={(option, index) => {
            // 关闭动作应该是同步执行的, 即 select 后立马关闭
            setShareSheetVisible(false);

            if (option.name === '二维码') {
              ImagePreview.open({
                images: [websiteQRCode],
                closeable: true,
              });
            } else if (option.name === '复制链接') {
              const url = 'hacker0limbo.github.io/china-top-univ/';

              if (navigator.clipboard === undefined) {
                // 检查浏览器是否支持 clipboard API
                // 例如 ios safari 需要配合 pointDown 事件触发
                Toast.info({
                  message: '您的浏览器暂不支持 clipboard API, 推荐更换成 Chrome 浏览器',
                });
              } else {
                navigator.clipboard
                  .writeText(url)
                  .then(() => {
                    Toast.success({
                      message: '链接已拷贝到剪贴板',
                      duration: 750,
                    });
                  })
                  .catch(() => {
                    Toast.fail({
                      message: '拷贝链接失败, 请重试',
                    });
                  });
              }
            } else {
              Toast.info({
                message: '该功能暂未实现, 敬请期待',
              });
            }
          }}
        />
      </Cell.Group>
    </div>
  );
}
