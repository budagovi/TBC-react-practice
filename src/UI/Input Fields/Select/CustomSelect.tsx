'use client'

// *
// * Custom select input element
// *

// --- style 
import './CustomSelect.css';
// --- react api
import { ReactNode, memo } from 'react';
// --- react-icons
import { Select } from "antd"

interface IProps {
  onChange: (str: string) => void;
  value: string | null,
  label?: string,
  options: { value: string, label: ReactNode }[],
  placeholder: string
}

const CustomSelect = memo(
  function CustomSelect({ options, onChange, label, placeholder, value }: IProps) {

    return (
      <div className='select-input-wrapper'>
        {label && <label>{label}</label>}
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}>
          {options.map((item, idx) =>
            <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
          )}

        </Select>
      </div>
    )
  })


export default CustomSelect;
