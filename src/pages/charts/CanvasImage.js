import React, { useRef } from 'react';
import Canvas from '@antv/f2-react';
import { ImagePreview } from 'react-vant';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  previewImage: {
    // 设置 preview 的背景为白色
    '& img': {
      backgroundColor: '#fff'
    }  
  },
})

// 将 canvas 配置成可点击后开启 image preview 的组件
export default function CanvasImage({ children, ...canvasProps }) {
  const canvasRef = useRef(null);
  const classes = useStyles()

  return (
    <div
      onClick={() => {
        if (canvasRef.current) {
          // https://stackoverflow.com/a/3514404/12733140
          const img = canvasRef.current.toDataURL('image/png');
          ImagePreview.open({
            closeable: true,
            images: [img],
            className: classes.previewImage
          });
        }
      }}
    >
      <Canvas canvasRef={canvasRef} {...canvasProps}>
        {children}
      </Canvas>
    </div>
  );
}
