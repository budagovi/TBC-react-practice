'use client'

/*-=-=-=-=-=-=-=-
  
  Input value passes date value (in number type - amount of milliseconds) 
  to its parent component (form).

  To get the Date object from outgoing value use dayjs(value).toDate() method.

  -=-=-=-=-=-=-=-*/

// --- style 
import './DateInput.css';
// --- react api
import { FocusEventHandler, memo, useEffect, useState } from 'react';
// --- react-icons
import { DatePicker, Tooltip } from "antd";
// --- dayjs
import dayjs, { Dayjs } from 'dayjs';

interface IProps {
  label?: string,
  placeholder: string
  name: string,
  value: number | null,
  onChange: (date: number | null) => void,
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
  errorMsgs?: string[],
  validate?: (value: number) => number,
  formSubmitted?: boolean,
  isRequired?: boolean,
}

/**
 * Custom date input element
 */
const DateInput = memo(
  function DateInput(
    {
      label,
      placeholder,
      name,
      value,
      onChange,
      errorMsgs,
      validate,
      formSubmitted,
      isRequired
    }: IProps) {

    value = value as number

    const [date, setDate] = useState<Dayjs>();
    const [wrapperClasses, setWrapperClasses] = useState(`invalid shaking`);
    const [isTouched, setIsTouched] = useState(false)

    // detect validity of value during onChange
    const isInvalid = errorMsgs && validate && validate(value) >= 0 && isTouched;

    // shake the component with invalid value on blur
    const shake = () => {
      !isTouched && setIsTouched(true)
      //fixed visual delay on invalid style after choosing date

      if (formSubmitted === false && date === null && wrapperClasses.includes('invalid'))
        return;

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
    }, [formSubmitted])

    return (
      <div className={`date-input-wrapper ${isInvalid ? wrapperClasses : ''}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <Tooltip
          title={isInvalid ? errorMsgs[validate(value)] : null}
          placement="bottomLeft"
          color='#b92e2e'
          destroyTooltipOnHide={true}
          mouseEnterDelay={0.07}
        >
          <DatePicker
            placeholder={placeholder}
            value={value ? dayjs(value) : null}
            onChange={(newDate) => {
              setDate(newDate)
              onChange(newDate ? newDate.valueOf() : null)  // send current value to parent
            }}
            onBlur={() => {
              !date && shake()
            }}
          />
        </Tooltip>
      </div>
    )
  })


export default DateInput;
