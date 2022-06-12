import React, { useState } from 'react';
import { Field, Picker, Popup } from 'react-vant';

import { searchOptions } from '../config/tableConfig';

export default function UniversityTableAdvSearchPicker(props) {
  const { value, onChange, name, form, searchItemIndex, ...fieldProps } = props
  const [showAdvancedSearchOptionsPicker, setShowAdvancedSearchOptionsPicker] = useState(false);
  const seletedSearchOptions = form?.getFieldsValue()?.advancedSearches?.map(v => v?.advancedSearchOption) ?? []
  const searchOptionsByName = searchOptions.map((o) => o.text).filter(optionName => {
    if (seletedSearchOptions.includes(optionName)) {
      // 已经有别的项选过了, 包括自己
      if (seletedSearchOptions[searchItemIndex] !== optionName) {
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
            onChange(value);
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
