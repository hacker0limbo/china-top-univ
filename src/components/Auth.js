import React, { useState } from 'react';
import { Button, Field, Form, Toast } from 'react-vant';

export default function Auth({ children }) {
  const [auth, setAuth] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { token } = values;
    if (token.trim().toLowerCase() === process.env.REACT_APP_AUTH_TOKEN) {
      Toast.success({
        message: '秘钥正确',
        onClose: () => {
          setAuth(true);
        },
      });
    } else {
      Toast.fail({
        message: '秘钥错误，请重试',
        onClose: () => {
          setAuth(false);
        },
      });
    }
  };

  return (
    <>
      {auth ? (
        <>{children}</>
      ) : (
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
      )}
    </>
  );
}
