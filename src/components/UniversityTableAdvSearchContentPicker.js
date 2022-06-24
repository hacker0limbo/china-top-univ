import React, { useState } from 'react';
import { Field, Picker, Popup } from 'react-vant';

// 搜索项的 picker 组件, 当搜索项含有多个选项是展示该组件
export default function UniversityTableAdvSearchContentPicker(props) {
  const { value, onChange, countedMultipleSearchOption, ...fieldProps } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Field
        isLink
        readonly
        {...fieldProps}
        value={value}
        onClick={() => {
          setVisible(true);
        }}
      />
      <Popup
        position="bottom"
        round
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <Picker
          title={countedMultipleSearchOption.text}
          columns={countedMultipleSearchOption.countableValues}
          onConfirm={(value) => {
            onChange(value);
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Popup>
    </>
  );
}
