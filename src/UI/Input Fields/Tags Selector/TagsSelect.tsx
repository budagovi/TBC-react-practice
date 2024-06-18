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
  value: IStoreTag[] | null,
  onChange: (str: IStoreTag[]) => void
}

type IStoreTag = 'medium' | 'large' | 'small' | 'pet friendly' | 'slow' | 'fast' | 'non-flowering' | 'seasonal flowering';
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
