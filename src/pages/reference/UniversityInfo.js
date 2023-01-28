import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cell, NavBar, Empty, Switch, DropdownMenu, Icon, Flex } from 'react-vant';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import rowData from '../../data/rowData.json';
import columnData from '../../data/columnData.json';
import { tableSeparators, doubleTops2017Range } from '../../config/tableConfig';

const useStyles = createUseStyles({
  infoCard: {
    margin: '16px 0',
  },
  settings: {
    '& .rv-dropdown-menu__bar': {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    '& .cell': {
      textAlign: 'start',
    },
  },
});

export default function UniversityInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const uniInfo = rowData[id];
  const showInvalidData = useSelector((state) => state.table.tableData.showInvalidData);
  const showDoubleTops2017Data = useSelector(
    (state) => state.table.tableData.showDoubleTops2017Data
  );
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title={uniInfo && uniInfo[0]}
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
        rightText={
          <DropdownMenu className={classes.settings}>
            <DropdownMenu.Item title="设置">
              <Cell center className="cell" title="显示无效数据">
                <Switch
                  checked={showInvalidData}
                  size={24}
                  onChange={(checkedValue) => {
                    dispatch.table.toggleInvalidData(checkedValue);
                  }}
                />
              </Cell>
              <Cell center className="cell" title="显示2017双一流数据">
                <Switch
                  size={24}
                  checked={showDoubleTops2017Data}
                  onChange={(checkedValue) => {
                    dispatch.table.toggleDoubleTops2017Data(checkedValue);
                  }}
                />
              </Cell>
            </DropdownMenu.Item>
          </DropdownMenu>
        }
      />
      {uniInfo ? (
        <Cell.Group
          title={
            isEditing ? (
              <Flex gutter={16}>
                <Flex.Item style={{ borderRight: 'thin solid var(--rv-gray-6)' }}>
                  重置
                  <Icon name="revoke" />
                </Flex.Item>
                <Flex.Item
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  style={{ color: 'var(--rv-green)' }}
                >
                  完成
                  <Icon name="success" />
                </Flex.Item>
              </Flex>
            ) : (
              <div
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                编辑
                <Icon name="edit" />
              </div>
            )
          }
          inset
          className={classes.infoCard}
        >
          {uniInfo.map((info, i) => {
            if (!showInvalidData && info === 'N/A') {
              return null;
            }

            if (!showDoubleTops2017Data && doubleTops2017Range.includes(i)) {
              return null;
            }

            return (
              <Cell
                border={
                  tableSeparators.includes(i) ||
                  (!showInvalidData && uniInfo[i + 1] === 'N/A' && tableSeparators.includes(i + 1))
                    ? true
                    : false
                }
                key={i}
                title={columnData[i]}
              >
                <div>{info}</div>
              </Cell>
            );
          })}
        </Cell.Group>
      ) : (
        <Empty description="查无此校" />
      )}
    </div>
  );
}
