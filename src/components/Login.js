import React from 'react';
import { Button, Field, Form, Toast, NavBar, Typography } from 'react-vant';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css';

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, logout } = useStore((state) => ({ login: state.login, logout: state.logout }));

  const onFinish = (values) => {
    const { token } = values;
    if (token.trim().toLowerCase() === process.env.REACT_APP_AUTH_TOKEN) {
      Toast.success({
        message: '秘钥正确',
        onClose: () => {
          login();
          navigate('/');
        },
      });
    } else {
      Toast.fail({
        message: '秘钥错误，请重试',
        onClose: () => {
          logout();
        },
      });
    }
  };

  return (
    <div>
      <NavBar safeAreaInsetTop title="登录" leftArrow={false} />
      <Typography.Title center level={2}>
        请先认证
      </Typography.Title>

      <Form
        form={form}
        showValidateMessage={false}
        className="auth-form"
        onFinish={onFinish}
        footer={
          <div className="auth-form-footer">
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          tooltip={{ message: '秘钥不区分大小写' }}
          rules={[{ required: true, message: '请填写秘钥' }]}
          name="token"
          label="秘钥"
        >
          <Field placeholder="请输入秘钥" />
        </Form.Item>
      </Form>
    </div>
  );
}
