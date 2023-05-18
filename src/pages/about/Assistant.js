import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavBar, Field, Button, Toast, Loading } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Configuration, OpenAIApi } from 'openai';
import dayjs from 'dayjs';
import { MessageList, SystemMessage, MessageBox } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';
import { LocalStorageService } from '../../services';
//
const useStyles = createUseStyles({
  assistantBody: {
    // margin: '0 20px 20px 20px',
  },
  chatLoading: {},
  messageList: {
    marginTop: '8px',
    marginBottom: '150px',
  },
  inputBottom: {
    '& .rv-field__label': {
      width: '2rem',
    },
  },
});

// 免责声明
export default function Assistant() {
  const apiKey = LocalStorageService.getAPIKey();
  const configuration = new Configuration({
    apiKey: apiKey || '',
  });
  const openai = new OpenAIApi(configuration);
  const navigate = useNavigate();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  // 取消请求终止器
  const controllerRef = useRef(null);

  const sendQuestion = useCallback(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: inputValue,
        date: dayjs().valueOf(),
        position: 'right',
        title: '你',
      },
    ]);

    setSending(true);
    controllerRef.current = new AbortController();
    openai
      .createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputValue }],
        },
        {
          signal: controllerRef.current.signal,
        }
      )
      .then((res) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: res.data.choices[0].message.content,
            date: dayjs().valueOf(),
            position: 'left',
            title: '小助手',
          },
        ]);
      })
      .catch((err) => {
        if (err.message === 'canceled') {
          // 取消请求
          controllerRef.current = null;
        } else {
          Toast.fail({
            message: '小助手可能出了点问题...请重试',
          });
        }
      })
      .finally(() => {
        setSending(false);
      });
  }, [inputValue]);

  useEffect(() => {
    if (apiKey) {
      // 初始请求一次 openai
      setConnecting(true);
      openai
        .createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: '你好' }],
          },
          // 5 秒钟的连接时间
          {
            timeout: 5000,
          }
        )
        .then((res) => {
          setSystemMessage(res.data.choices[0].message.content);
        })
        .catch((err) => {
          setSystemMessage('小助手连接失败, 请检查配置的 Key 是否正确');
        })
        .finally(() => {
          setConnecting(false);
        });
    } else {
      setSystemMessage('暂未配置 API Key, 请前往设置页面配置');
    }
  }, [apiKey]);

  useLayoutEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="小助手"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />
      <div className={classes.assistantBody}>
        <div className={classes.messageList}>
          <SystemMessage text={connecting ? '连接中...' : systemMessage} />
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={[...messages]
              .sort((a, b) => a.date - b.date)
              .map((m) => ({
                ...m,
                type: 'text',
              }))}
          />
          {sending ? (
            <MessageBox
              type="text"
              text={
                <div style={{ display: 'inline-block' }}>
                  <Loading type="ball" />
                </div>
              }
              position="left"
              title="小助手"
              removeButton={true}
              onRemoveMessageClick={(e) => {
                if (controllerRef.current) {
                  controllerRef.current.abort();
                }
              }}
            />
          ) : null}
        </div>
        <div className={classes.inputBottom}>
          <Field
            disabled={sending || connecting || !apiKey}
            type="textarea"
            style={{ position: 'fixed', bottom: 50 }}
            value={inputValue}
            onChange={setInputValue}
            clearable
            placeholder="随便说些什么吧..."
            label="提问"
            onKeypress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendQuestion();
                setInputValue('');
              }
            }}
            button={
              <Button
                disabled={sending || connecting || !apiKey}
                size="small"
                type="primary"
                onClick={() => {
                  sendQuestion();
                  setInputValue('');
                }}
              >
                发送
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
