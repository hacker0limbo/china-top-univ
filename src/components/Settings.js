import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Cell, Switch, Button, Dialog } from 'react-vant';
import useStore from '../store';
import { setPersistAuth, getPersistAuth, removePersistAuth } from '../utils';

export default function Settings() {
  const navigate = useNavigate();
  const [rememberToken, setRememberToken] = useState(getPersistAuth());
  const logout = useStore((state) => state.logout);

  return (
    <div>
      <NavBar safeAreaInsetTop title="设置" leftArrow={false} />
      <Cell.Group title="登录设置">
        <Cell center title="登录时记住秘钥">
          <Switch
            size={24}
            checked={rememberToken}
            onChange={(changedValue) => {
              setRememberToken(changedValue);
              setPersistAuth(changedValue);
            }}
          />
        </Cell>
      </Cell.Group>

      <div className="settings-footer">
        <Button
          type="primary"
          block
          round
          onClick={() => {
            Dialog.confirm({
              title: '温馨提示',
              message: '您确定要登出吗?',
            })
              .then(() => {
                logout();
                // 需要移除持久化 auth
                removePersistAuth();
                navigate('/login', { replace: true });
              })
              .catch(() => {
                // 不登出
              });
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
