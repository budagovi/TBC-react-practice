'use client'

// *
// * Custom date input element
// *

// --- style 
import './DateInput.css';
// --- react api
import { memo, useState } from 'react';
// --- react-icons
import { DatePicker } from "antd";
// --- dayjs
import { Dayjs } from 'dayjs';

interface IProps {
  label?: string,
  placeholder: string
  name: string,
  onChange: (date: number | null) => void;
}

const DateInput = memo(
  function DateInput({ label, placeholder, name, onChange, }: IProps) {

    const [controlledDate, setControlledDate] = useState<Dayjs>();

    return (
      <div className='date-input-wrapper'>
        {label && <label htmlFor={name}>{label}</label>}
        <DatePicker
          placeholder={placeholder}
          value={controlledDate}
          onChange={(newDate) => {
            setControlledDate(newDate) // update controlled value
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