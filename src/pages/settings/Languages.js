import React, { useState } from 'react';
import { NavBar, Button, Radio, Cell, Toast, NoticeBar } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../constants/store';
import { useDispatch } from 'react-redux';

const useStyles = createUseStyles({
  navBarButton: {
    height: 'var(--rv-button-mini-height)',
  },
});

export default function Languages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const language = useSelector((state) => state.i18n.language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="多语言设置"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
        rightText={
          <Button
            disabled={selectedLanguage === language}
            className={classes.navBarButton}
            plain
            type="primary"
            size="small"
            onClick={() => {
              dispatch.i18n.setLanguage(selectedLanguage);
              Toast.success({
                message: '设置成功',
                onClose: () => {
                  navigate(-1);
                },
              });
            }}
          >
            确定
          </Button>
        }
      />

      <NoticeBar leftIcon="info-o" scrollable>
        多语言功能并未全部完整实现, 敬请谅解!
      </NoticeBar>

      <Radio.Group value={selectedLanguage}>
        <Cell.Group>
          {Object.values(LANGUAGES).map(({ STATE, TEXT }) => (
            <Cell
              onClick={() => {
                setSelectedLanguage(STATE);
              }}
              key={STATE}
              title={TEXT}
              rightIcon={<Radio name={STATE} />}
            />
          ))}
        </Cell.Group>
      </Radio.Group>
    </div>
  );
}
