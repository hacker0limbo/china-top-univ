import React from 'react';
import { NavBar, Typography } from 'react-vant';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div>
      <NavBar safeAreaInsetTop title="登录" leftArrow={false} />
      <Typography.Title center level={2}>
        请先认证
      </Typography.Title>
      <LoginForm />
    </div>
  );
}
