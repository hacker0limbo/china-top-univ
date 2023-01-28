import React, { useEffect, useState } from 'react';
import {
  NavBar,
  Uploader,
  Flex,
  Empty,
  Typography,
  Sticky,
  Lazyload,
  Cell,
  Loading,
  Toast,
} from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import * as XLSX from 'xlsx';

const useStyles = createUseStyles({
  uploadSection: {
    backgroundColor: 'var(--rv-white)',
    borderRadius: '4px',
  },
  upload: {
    marginTop: '8px',
  },
  notes: {
    '& ul': {
      listStyle: 'circle',
    },
  },
  newData: {
    margin: '16px 0',
  },
});

export default function Upload() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [fileList, setFileList] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fileList.length) {
      setLoading(true);
      const file = fileList[0];
      file.file
        .arrayBuffer()
        .then((data) => {
          const workbook = XLSX.read(data);
          const arraySchoolData = XLSX.utils.sheet_to_json(workbook.Sheets['高校名單'], {
            header: 1,
            defval: null,
          });
          const [, columnData, ...rowData] = arraySchoolData;
          setRowData(rowData);
          setColumnData(columnData);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Toast.fail({
            message: '生成表格失败, 请重试',
          });
        });
    }
  }, [fileList]);

  const handleAfterRead = (file, { name, index }) => {
    file.status = 'done';
    file.message = '上传成功';
    setFileList([file]);
  };

  return (
    <div>
      <NavBar
        safeAreaInsetTop
        title="预览新数据"
        leftArrow
        leftText="返回"
        onClickLeft={() => {
          navigate(-1);
        }}
      />

      <Sticky>
        <Flex className={classes.uploadSection} align="center" justify="around">
          <Flex.Item className={classes.upload}>
            <Uploader
              value={fileList}
              afterRead={handleAfterRead}
              onDelete={() => {
                setFileList([]);
              }}
              uploadText="点击上传"
              maxCount={1}
              accept=".xlsx, .xls"
              uploadIcon="plus"
            />
          </Flex.Item>
          <Flex.Item className={classes.notes}>
            <ul>
              <li>
                <Typography.Text>
                  上传数据格式仅允许 <em>.xlsx</em> 和 <em>.xls</em>
                </Typography.Text>
              </li>
              <li>
                <Typography.Text>数据仅供预览, 不会保存本地</Typography.Text>
              </li>
              <li>
                <Typography.Text>数据不会覆盖网页原始数据</Typography.Text>
              </li>
            </ul>
          </Flex.Item>
        </Flex>
      </Sticky>

      <div className={classes.newData}>
        {fileList.length ? (
          loading ? (
            <Loading type="spinner" vertical size="32">
              生成表格中
            </Loading>
          ) : (
            <>
              {rowData.map((rs, rsIndex) => (
                <Lazyload key={rsIndex}>
                  <Cell.Group inset>
                    {rs.map((info, i) => (
                      <Cell border={false} key={i} title={columnData[i]}>
                        {info}
                      </Cell>
                    ))}
                  </Cell.Group>
                </Lazyload>
              ))}
            </>
          )
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
    </div>
  );
}
