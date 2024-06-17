'use client'
// --- style 
import './CustomSelect.css';
// --- react api
import { FocusEventHandler, ReactNode, memo, useEffect, useState } from 'react';
// --- react-icons
import { Select, Tooltip } from "antd"

interface IProps {
  label?: string,
  placeholder?: string
  options: { value: string, label: ReactNode }[],
  value: string | null,
  onChange: (str: string) => void,
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
  errorMsgs?: string[],
  validate?: (value: string) => number,
  formSubmitted?: boolean,
  isRequired?: boolean
}

/**
 * Custom select input element (can be validate to be required and highlight after touch)
 */
const CustomSelect = memo(
  function CustomSelect(
    {
      label,
      placeholder,
      options,
      value,
      onChange,
      errorMsgs,
      validate,
      formSubmitted,
      isRequired
    }: IProps) {

    value = value as string

    const [wrapperClasses, setWrapperClasses] = useState(`invalid shaking`);
    const [isTouched, setIsTouched] = useState(false)

    // detect validity of value during onChange
    const isInvalid = errorMsgs && validate && validate(value) >= 0 && isTouched;

    // shake the component with invalid value on blur
    const shake = () => {
      !isTouched && setIsTouched(true)

      setWrapperClasses(`invalid shaking`);
      const timer = setTimeout(() => {
        setWrapperClasses(`invalid`);
      }, 350);

      return () => {
        clearTimeout(timer);
      }

    }

    // validate on form submission (for required fields, to check if they are empty)
    useEffect(() => {
      if (!isRequired || formSubmitted === false)
        return;

      shake()
      !isTouched && setIsTouched(true)
    }, [formSubmitted])

    return (
      <div className={`select-input-wrapper ${isInvalid ? wrapperClasses : ''}`}>
        {label && <label>{label}</label>}
        <Tooltip
          title={isInvalid ? errorMsgs[validate(value)] : null}
          placement="bottomLeft"
          color='#b92e2e'
          destroyTooltipOnHide={true}
          mouseEnterDelay={0.07}
        >
          <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={shake}
          >
            {options.map((item, idx) =>
              <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
            )}

          </Select>
        </Tooltip>
      </div>
    )
  })


export default CustomSelect;
