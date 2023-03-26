import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, NavBar, Toast, Typography } from 'react-vant';
import { LocalStorageService } from '../../services';

export default function AssistantKey() {
  const navigate = useNavigate();
  const [key, setKey] = useState(LocalStorageService.getAPIKey() || '');

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="配置小助手"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
        rightText={
          <Typography.Text type={key === '' ? 'secondary' : 'primary'}>保存</Typography.Text>
        }
        onClickRight={() => {
          if (key !== '') {
            LocalStorageService.setAPIKey(key);
            Toast.success({
              message: '配置成功',
              onClose: () => {
                navigate('/settings');
              },
            });
          }
        }}
      />

      <Field
        style={{ marginTop: '16px' }}
        label="API Key"
        clearable
        value={key}
        placeholder="请填入 API Key"
        onChange={(v) => {
          setKey(v);
        }}
      />
    </div>
  );
}
