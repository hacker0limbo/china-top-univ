import React, { useState } from 'react';
import { Field, Picker, Popup } from 'react-vant';

import { searchOptions } from '../config/tableConfig';

// 搜索项的 picker 组件
export default function UniversityTableAdvSearchOptionPicker(props) {
  const { value, onChange, resetSearchContentOnConfirm, name, form, searchItemIndex, ...fieldProps } = props
  const [showAdvancedSearchOptionsPicker, setShowAdvancedSearchOptionsPicker] = useState(false);
  const selectedSearchOptions = form?.getFieldsValue()?.advancedSearches?.map(v => v?.advancedSearchOption) ?? []
  const searchOptionsByName = searchOptions.map((o) => o.text).filter(optionName => {
    if (selectedSearchOptions.includes(optionName)) {
      // 已经有别的项选过了, 包括自己
      if (selectedSearchOptions[searchItemIndex] !== optionName) {
        // 不包括自己
        return false
      }
    }
    // 没选过, 或者是自己选了
    return true
  })

  return (
    <>
      <Field
        isLink
        readonly
        name={name}
        {...fieldProps}
        value={value}
        onClick={() => {
          setShowAdvancedSearchOptionsPicker(true);
        }}
      />
      <Popup
        position="bottom"
        round
        visible={showAdvancedSearchOptionsPicker}
        onClose={() => {
          setShowAdvancedSearchOptionsPicker(false);
        }}
      >
        <Picker
          title="请选择搜索项"
          columns={searchOptionsByName}
          onConfirm={(value) => {
            // 隐式传递的 onChange 内部应该是做了 setFieldsValue 等事情, v1
            onChange(value);
            resetSearchContentOnConfirm(value)
            setShowAdvancedSearchOptionsPicker(false);
          }}
          onCancel={() => {
            setShowAdvancedSearchOptionsPicker(false);
          }}
        />
      </Popup>
    </>
  );
}
