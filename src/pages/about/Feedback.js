import React, { useState } from 'react';
import { Button, NavBar, Form, Field, Toast } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import emailjs from '@emailjs/browser';

const useStyles = createUseStyles({
  feedbackForm: {
    margin: '20px 0',
  },
  feedbackFormFooter: {
    margin: '20px',
  },
});

export default function Feedback() {
  const navigate = useNavigate();
  const [feedbackForm] = Form.useForm();
  const classes = useStyles();
  const [feedbackEmpty, setFeedbackEmpty] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emailjsPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const emailjsTemplateKey = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const emailjsServiceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;

  console.log(Form);

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="意见反馈"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />

      <Form
        form={feedbackForm}
        onValuesChange={(changedValues) => {
          // 等 v3 之后改为 useWatch 监听 feedback
          // https://stackblitz.com/edit/react-yzpbwo-pcbcv6?file=src%2FApp.tsx
          if (Object.keys(changedValues).length === 1 && changedValues.hasOwnProperty('feedback')) {
            if (changedValues.feedback.length > 0) {
              setFeedbackEmpty(false);
            } else {
              setFeedbackEmpty(true);
            }
          }
        }}
        className={classes.feedbackForm}
        onFinish={(values) => {
          setSubmitting(true);
          emailjs
            .send(
              emailjsServiceID,
              emailjsTemplateKey,
              {
                contact_details: values.contact,
                message: values.feedback,
              },
              emailjsPublicKey
            )
            .then(({ status, text }) => {
              if (status === 200) {
                Toast.success({
                  message: '发送成功, 感谢您的反馈',
                  onClose: () => {
                    setSubmitting(false);
                  },
                });
              } else {
                throw new Error(text);
              }
            })
            .catch((error) => {
              Toast.fail({
                message: '反馈发送失败, 请重试',
                onClose: () => {
                  setSubmitting(false);
                },
              });
            });
        }}
        footer={
          <div className={classes.feedbackFormFooter}>
            <Button
              disabled={feedbackEmpty ? true : submitting ? true : false}
              round
              nativeType="submit"
              type="primary"
              block
            >
              {submitting ? '提交中...' : '提交'}
            </Button>
          </div>
        }
      >
        <Form.Item required name="feedback" label="反馈描述">
          <Field
            rows={5}
            autosize
            type="textarea"
            maxlength={300}
            showWordLimit
            placeholder="说说您的建议以便我们提供更好的服务"
          />
        </Form.Item>
        <Form.Item name="contact" label="联系方式">
          <Field placeholder="请输入您联系方式 (手机或邮箱, 选填)" />
        </Form.Item>
      </Form>
    </div>
  );
}
