'use client';

// --- style 
import './TagsSelect.css';
// --- react api
import { ReactNode, memo, useEffect, useRef, useState } from 'react';
// --- react-icons
import { ConfigProvider, Select } from "antd";
// --- types
import { IStoreTag } from '@/src/hooks/useStoreQueryParams';

interface IProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: ReactNode }[];
  value: IStoreTag[] | null;
  onChange: (str: IStoreTag[]) => void;
}

/**
 * Custom select input element for setting multiple tags
 */
const TagsSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: IProps) => {
  const [renderCount, setRenderCount] = useState(0);
  const propsChanged = useRef(false);

  // Detect props change
  useEffect(() => {
    propsChanged.current = true;
  }, [label, placeholder, options, value, onChange]);

  // Trigger extra render on props change
  useEffect(() => {
    if (propsChanged.current) {
      setRenderCount((prev) => prev + 1);
      propsChanged.current = false;
    }
  }, [renderCount]);


  return (
    <div className='select-input-wrapper'>
      {label && <label>{label}</label>}
      <ConfigProvider theme={{
        components: {
          Select: {
            optionFontSize: 13,
          }
        }
      }}>
        <Select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          mode='multiple'
          maxTagCount='responsive'
          placement='bottomLeft'
          listHeight={150}
        >
        {options.map((item, idx) => (
          <Select.Option key={idx} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </ConfigProvider>
    </div >
  );
};

export default memo(TagsSelect);
