import React, { useMemo } from 'react';
import { Button, Field, Form, Toast } from 'react-vant';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

const useStyles = createUseStyles({
  loginForm: {
    margin: '20px 0',
  },
  loginFormFooter: {
    margin: '20px',
  },
});

export default function LoginForm() {
  const classes = useStyles();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const redirectUrl = useMemo(() => new URLSearchParams(search).get('redirect'), [search]);

  const onFinish = (values) => {
    const { token } = values;
    if (token.trim().toLowerCase() === process.env.REACT_APP_AUTH_TOKEN) {
      Toast.success({
        message: '秘钥正确',
        onClose: () => {
          dispatch.auth.login();
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate('/');
          }
        },
      });
    } else {
      Toast.fail({
        message: '秘钥错误，请重试',
        onClose: () => {
          dispatch.auth.logout();
        },
      });
    }
  };

  return (
    <Form
      form={form}
      showValidateMessage={false}
      className={classes.loginForm}
      onFinish={onFinish}
      footer={
        <div className={classes.loginFormFooter}>
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
        <Field
          type="password"
          onKeypress={(e) => {
            // 由于表单只有一个 input, 直接监听 enter 键, enter 时也提交表单
            if (e.key === 'Enter') {
              form.submit();
            }
          }}
          placeholder="请输入秘钥"
        />
      </Form.Item>
    </Form>
  );
}
