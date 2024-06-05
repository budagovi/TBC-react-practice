'use client'

// *
// * Custom date input element
// *

// --- style 
import './DateInput.css';
// --- react api
import { memo } from 'react';
// --- react-icons
import { DatePicker } from "antd";
// --- dayjs
import dayjs from 'dayjs';

interface IProps {
  label?: string,
  placeholder: string
  name: string,
  value: number | null,
  onChange: (date: number | null) => void;
}

const DateInput = memo(
  function DateInput({ label, placeholder, name, value, onChange, }: IProps) {

    return (
      <div className='date-input-wrapper'>
        {label && <label htmlFor={name}>{label}</label>}
        <DatePicker
          placeholder={placeholder}
          value={value ? dayjs(value) : null}
          onChange={(newDate) => {
            onChange(newDate ? newDate.valueOf() : null)  // send current value to parent
          }}
        />
      </div>
    )
  })


export default DateInput;

/*-=-=-=-=-=-=-=-

  Input value is Controlled within given component using useState
  and only passes date value (in number type - amount of milliseconds) 
  to its parent component (form tag).

  To get the Date object from outgoing value use dayjs(value) function.

  -=-=-=-=-=-=-=-*/