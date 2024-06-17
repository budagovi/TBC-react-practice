'use client'
// --- style 
import './TagsSelect.css';
// --- react api
import { ReactNode, memo } from 'react';
// --- react-icons
import { Select } from "antd"

interface IProps {
  label?: string,
  placeholder?: string
  options: { value: string, label: ReactNode }[],
  value: string[] | null,
  onChange: (str: string[]) => void
}

/**
 * Custom select input element for setting multiple tags
 */
const TagsSelect = memo(
  function TagsSelect(
    {
      label,
      placeholder,
      options,
      value,
      onChange
    }: IProps) {

    return (
      <div className='select-input-wrapper'>
        {label && <label>{label}</label>}
        <Select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          mode='multiple'
          maxTagCount='responsive'
        >
          {options.map((item, idx) =>
            <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
          )}

        </Select>
      </div >
    )
  })


export default TagsSelect;
